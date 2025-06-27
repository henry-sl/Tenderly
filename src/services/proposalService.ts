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
  },

  // Version control methods
  async saveProposalVersion(proposalId: string, content: string, title: string, userId: string) {
    // Get the next version number
    const { data: latestVersion } = await supabase
      .from('proposal_versions')
      .select('version_number')
      .eq('proposal_id', proposalId)
      .order('version_number', { ascending: false })
      .limit(1)
      .maybeSingle()

    const nextVersionNumber = latestVersion ? latestVersion.version_number + 1 : 1

    const { data, error } = await supabase
      .from('proposal_versions')
      .insert({
        proposal_id: proposalId,
        content,
        title,
        version_number: nextVersionNumber,
        created_by: userId
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getProposalVersions(proposalId: string) {
    const { data, error } = await supabase
      .from('proposal_versions')
      .select(`
        id,
        proposal_id,
        content,
        title,
        version_number,
        created_at,
        created_by
      `)
      .eq('proposal_id', proposalId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getProposalVersion(versionId: string) {
    const { data, error } = await supabase
      .from('proposal_versions')
      .select(`
        id,
        proposal_id,
        content,
        title,
        version_number,
        created_at,
        created_by
      `)
      .eq('id', versionId)
      .single()

    if (error) throw error
    return data
  },

  async restoreProposalVersion(proposalId: string, versionId: string, userId: string) {
    // Get the version content
    const version = await this.getProposalVersion(versionId)
    
    // Update the main proposal with the version content
    const updatedProposal = await this.updateProposal(proposalId, {
      content: version.content,
      title: version.title
    })

    // Save this restoration as a new version
    await this.saveProposalVersion(proposalId, version.content, version.title, userId)

    return updatedProposal
  }
}