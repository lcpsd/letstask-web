import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)