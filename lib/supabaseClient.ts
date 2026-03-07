import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tdupcwewtsorpysngbsg.supabase.co' //process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = 'sb_publishable_G7-vto1nAfBK0R5ZQHmi6g_-KWtl3NR'//process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)