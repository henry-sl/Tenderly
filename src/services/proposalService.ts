import { supabase } from '../lib/supabase'
import { Database } from '../lib/supabase'

type Proposal = Database['public']['Tables']['proposals']['Row']
type ProposalInsert = Database['public']['Tables']['proposals']['Insert']
type ProposalUpdate = Database['public']['Tables']['proposals']['Update']

export const proposalService = {
  async getProposalsByCompany(companyId: string) {
    const { data, error } = await supabase
      .from('proposals')
      .select(`
        *,
        tenders (
          id,
          title,
          organization,
          deadline
        )
      `)
      .eq('company_id', companyId)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getProposalById(id: string) {
    const { data, error } = await supabase
      .from('proposals')
      .select(`
        *,
        tenders (
          id,
          title,
          organization,
          deadline
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
      .maybeSingle()

    if (error) throw error
    return data
  },

  async createProposal(proposal: ProposalInsert) {
    const { data, error } = await supabase
      .from('proposals')
      .insert(proposal)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateProposal(id: string, updates: ProposalUpdate) {
    const { data, error } = await supabase
      .from('proposals')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async submitProposal(id: string) {
    const { data, error } = await supabase
      .from('proposals')
      .update({ 
        status: 'submitted',
        submitted_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }
}