import { supabase } from '../lib/supabase'
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

    if (error) throw error
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

  async addCertification(certification: Database['public']['Tables']['certifications']['Insert']) {
    const { data, error } = await supabase
      .from('certifications')
      .insert(certification)
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
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}