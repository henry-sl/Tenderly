import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Storage bucket names
export const STORAGE_BUCKETS = {
  CERTIFICATIONS: 'certifications',
  DOCUMENTS: 'documents'
} as const

// Database types
export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          user_id: string
          name: string
          registration_number: string
          address: string
          phone: string
          email: string
          website: string | null
          industry: string
          employees: number
          established: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          registration_number: string
          address: string
          phone: string
          email: string
          website?: string | null
          industry: string
          employees?: number
          established: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          registration_number?: string
          address?: string
          phone?: string
          email?: string
          website?: string | null
          industry?: string
          employees?: number
          established?: string
          created_at?: string
          updated_at?: string
        }
      }
      tenders: {
        Row: {
          id: string
          title: string
          description: string
          organization: string
          location: string
          budget: number
          deadline: string
          published_date: string
          status: 'open' | 'closing_soon' | 'closed'
          category: string
          bid_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          organization: string
          location: string
          budget: number
          deadline: string
          published_date?: string
          status?: 'open' | 'closing_soon' | 'closed'
          category: string
          bid_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          organization?: string
          location?: string
          budget?: number
          deadline?: string
          published_date?: string
          status?: 'open' | 'closing_soon' | 'closed'
          category?: string
          bid_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      proposals: {
        Row: {
          id: string
          tender_id: string
          company_id: string
          title: string
          content: string
          status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected'
          submitted_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tender_id: string
          company_id: string
          title: string
          content?: string
          status?: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected'
          submitted_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tender_id?: string
          company_id?: string
          title?: string
          content?: string
          status?: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected'
          submitted_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      certifications: {
        Row: {
          id: string
          company_id: string
          name: string
          issued_by: string
          issue_date: string
          expiry_date: string | null
          document_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          issued_by: string
          issue_date: string
          expiry_date?: string | null
          document_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          name?: string
          issued_by?: string
          issue_date?: string
          expiry_date?: string | null
          document_url?: string | null
          created_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          name: string
          type: string
          size: number
          url: string
          upload_date: string
          tender_id: string | null
          company_id: string | null
          proposal_id: string | null
        }
        Insert: {
          id?: string
          name: string
          type: string
          size: number
          url: string
          upload_date?: string
          tender_id?: string | null
          company_id?: string | null
          proposal_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          type?: string
          size?: number
          url?: string
          upload_date?: string
          tender_id?: string | null
          company_id?: string | null
          proposal_id?: string | null
        }
      }
      experiences: {
        Row: {
          id: string
          company_id: string
          project_name: string
          client_name: string
          description: string
          start_date: string
          end_date: string | null
          project_value: number | null
          category: string
          status: 'completed' | 'ongoing' | 'cancelled'
          location: string
          key_achievements: string[]
          technologies: string[] | null
          team_size: number | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          project_name: string
          client_name: string
          description: string
          start_date: string
          end_date?: string | null
          project_value?: number | null
          category: string
          status?: 'completed' | 'ongoing' | 'cancelled'
          location: string
          key_achievements?: string[]
          technologies?: string[] | null
          team_size?: number | null
          role: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          project_name?: string
          client_name?: string
          description?: string
          start_date?: string
          end_date?: string | null
          project_value?: number | null
          category?: string
          status?: 'completed' | 'ongoing' | 'cancelled'
          location?: string
          key_achievements?: string[]
          technologies?: string[] | null
          team_size?: number | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      attestations: {
        Row: {
          id: string
          type: 'completion' | 'quality' | 'compliance' | 'reputation'
          issuer: string
          recipient: string
          description: string
          score: number
          date: string
          blockchain_tx_id: string
          verified: boolean
          created_at: string
        }
        Insert: {
          id?: string
          type: 'completion' | 'quality' | 'compliance' | 'reputation'
          issuer: string
          recipient: string
          description: string
          score: number
          date: string
          blockchain_tx_id: string
          verified?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'completion' | 'quality' | 'compliance' | 'reputation'
          issuer?: string
          recipient?: string
          description?: string
          score?: number
          date?: string
          blockchain_tx_id?: string
          verified?: boolean
          created_at?: string
        }
      }
      tender_requirements: {
        Row: {
          id: string
          tender_id: string
          requirement: string
          order_index: number
        }
        Insert: {
          id?: string
          tender_id: string
          requirement: string
          order_index?: number
        }
        Update: {
          id?: string
          tender_id?: string
          requirement?: string
          order_index?: number
        }
      }
      tender_contacts: {
        Row: {
          id: string
          tender_id: string
          name: string
          email: string
          phone: string
        }
        Insert: {
          id?: string
          tender_id: string
          name: string
          email: string
          phone: string
        }
        Update: {
          id?: string
          tender_id?: string
          name?: string
          email?: string
          phone?: string
        }
      }
    }
  }
}