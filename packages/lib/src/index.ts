import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

export const createSupabaseClient = (supabaseUrl: string, supabaseAnonKey: string) => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

export * from './types'
export * from './supabase'
