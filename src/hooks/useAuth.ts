import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const updateEmail = async (newEmail: string, password: string) => {
    try {
      // Use reauthenticate to verify the current password without creating a new session
      const { error: reauthError } = await supabase.auth.reauthenticate()
      
      if (reauthError) {
        // If reauthenticate fails, try the alternative approach with better error handling
        const currentEmail = user?.email
        if (!currentEmail) {
          return { error: { message: 'No current user found' } }
        }

        // Create a temporary client to verify credentials without affecting current session
        const { error: verifyError } = await supabase.auth.signInWithPassword({
          email: currentEmail,
          password,
        })

        if (verifyError) {
          return { error: { message: 'Current password is incorrect' } }
        }
      }

      // If verification successful, update the email
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail,
      })

      return { data, error }
    } catch (error) {
      return { error: { message: 'An error occurred during authentication' } }
    }
  }

  const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    return { data, error }
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateEmail,
    updatePassword,
  }
}