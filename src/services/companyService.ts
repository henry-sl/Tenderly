import { supabase, STORAGE_BUCKETS } from '../lib/supabase'
import { Database } from '../lib/supabase'

type Company = Database['public']['Tables']['companies']['Row']
type CompanyInsert = Database['public']['Tables']['companies']['Insert']
type CompanyUpdate = Database['public']['Tables']['companies']['Update']

export const companyService = {
  async getCompanyByUserId(userId: string) {
    const { data, error } = await supabase
      .from('companies')
      .select(`
        *,
        certifications (
          id,
          name,
          issued_by,
          issue_date,
          expiry_date,
          document_url
        ),
        documents (
          id,
          name,
          type,
          size,
          url,
          upload_date
        )
      `)
      .eq('user_id', userId)
      .maybeSingle()

    // Only throw error if it's a real error, not when no company is found
    if (error && error.code !== 'PGRST116') {
      throw error
    }
    
    return data
  },

  async createCompany(company: CompanyInsert) {
    const { data, error } = await supabase
      .from('companies')
      .insert(company)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateCompany(id: string, updates: CompanyUpdate) {
    const { data, error } = await supabase
      .from('companies')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // File upload/delete utilities
  async uploadFile(file: File, bucketName: string, filePath: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path)

    return urlData.publicUrl
  },

  async deleteFile(bucketName: string, filePath: string): Promise<void> {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath])

    if (error) throw error
  },

  // Extract file path from URL for deletion
  getFilePathFromUrl(url: string, bucketName: string): string {
    const urlParts = url.split(`/storage/v1/object/public/${bucketName}/`)
    return urlParts[1] || ''
  },

  // Certification methods
  async addCertification(certification: Database['public']['Tables']['certifications']['Insert'], file?: File) {
    let documentUrl = certification.document_url

    if (file) {
      const timestamp = Date.now()
      const fileExtension = file.name.split('.').pop()
      const filePath = `${certification.company_id}/${timestamp}-${file.name}`
      
      documentUrl = await this.uploadFile(file, STORAGE_BUCKETS.CERTIFICATIONS, filePath)
    }

    const { data, error } = await supabase
      .from('certifications')
      .insert({
        ...certification,
        document_url: documentUrl
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateCertification(id: string, updates: Database['public']['Tables']['certifications']['Update']) {
    const { data, error } = await supabase
      .from('certifications')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteCertification(id: string) {
    // First get the certification to check if it has a document
    const { data: certification, error: fetchError } = await supabase
      .from('certifications')
      .select('document_url')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Delete the file from storage if it exists
    if (certification.document_url) {
      try {
        const filePath = this.getFilePathFromUrl(certification.document_url, STORAGE_BUCKETS.CERTIFICATIONS)
        if (filePath) {
          await this.deleteFile(STORAGE_BUCKETS.CERTIFICATIONS, filePath)
        }
      } catch (error) {
        console.warn('Failed to delete certification file from storage:', error)
        // Continue with database deletion even if file deletion fails
      }
    }

    // Delete the database record
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Document methods
  async addDocument(document: Omit<Database['public']['Tables']['documents']['Insert'], 'url' | 'upload_date'>, file: File) {
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const filePath = `${document.company_id}/${timestamp}-${file.name}`
    
    const documentUrl = await this.uploadFile(file, STORAGE_BUCKETS.DOCUMENTS, filePath)

    const { data, error } = await supabase
      .from('documents')
      .insert({
        ...document,
        url: documentUrl,
        upload_date: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteDocument(id: string) {
    // First get the document to get its URL
    const { data: document, error: fetchError } = await supabase
      .from('documents')
      .select('url')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Delete the file from storage
    try {
      const filePath = this.getFilePathFromUrl(document.url, STORAGE_BUCKETS.DOCUMENTS)
      if (filePath) {
        await this.deleteFile(STORAGE_BUCKETS.DOCUMENTS, filePath)
      }
    } catch (error) {
      console.warn('Failed to delete document file from storage:', error)
      // Continue with database deletion even if file deletion fails
    }

    // Delete the database record
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}