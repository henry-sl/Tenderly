import { supabase } from '../lib/supabase'
import { Database } from '../lib/supabase'

type Tender = Database['public']['Tables']['tenders']['Row']
type TenderInsert = Database['public']['Tables']['tenders']['Insert']

export const tenderService = {
  async getTenders() {
    const { data, error } = await supabase
      .from('tenders')
      .select(`
        *,
        tender_requirements (
          id,
          requirement,
          order_index
        ),
        tender_contacts (
          id,
          name,
          email,
          phone
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
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getTenderById(id: string) {
    const { data, error } = await supabase
      .from('tenders')
      .select(`
        *,
        tender_requirements (
          id,
          requirement,
          order_index
        ),
        tender_contacts (
          id,
          name,
          email,
          phone
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
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async searchTenders(query: string, filters: any = {}) {
    let queryBuilder = supabase
      .from('tenders')
      .select(`
        *,
        tender_requirements (
          id,
          requirement,
          order_index
        ),
        tender_contacts (
          id,
          name,
          email,
          phone
        )
      `)

    // Apply search query
    if (query) {
      queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%,organization.ilike.%${query}%`)
    }

    // Apply filters
    if (filters.category) {
      queryBuilder = queryBuilder.eq('category', filters.category)
    }
    
    if (filters.status) {
      queryBuilder = queryBuilder.eq('status', filters.status)
    }

    if (filters.location) {
      queryBuilder = queryBuilder.ilike('location', `%${filters.location}%`)
    }

    const { data, error } = await queryBuilder.order('created_at', { ascending: false })

    if (error) throw error
    return data
  }
}