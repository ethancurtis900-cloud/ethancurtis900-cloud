import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)

      // Check if user is admin
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .maybeSingle()

        setIsAdmin(data?.is_admin ?? false)
      } else {
        setIsAdmin(false)
      }

      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Use async IIFE to handle async operations safely
        (async () => {
          setUser(session?.user ?? null)

          // Check if user is admin
          if (session?.user) {
            const { data } = await supabase
              .from('profiles')
              .select('is_admin')
              .eq('id', session.user.id)
              .maybeSingle()

            setIsAdmin(data?.is_admin ?? false)
          } else {
            setIsAdmin(false)
          }

          setLoading(false)
        })()
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, metadata?: { full_name?: string }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: metadata ? { data: metadata } : undefined
    })
    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const signInAnonymously = async () => {
    const { data, error } = await supabase.auth.signInAnonymously()
    return { data, error }
  }

  return {
    user,
    loading,
    isAdmin,
    signIn,
    signUp,
    signOut,
    signInAnonymously,
  }
}