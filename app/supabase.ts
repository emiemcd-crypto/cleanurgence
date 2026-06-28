import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mzgavqqljgfrjlktcaja.supabase.co'
const supabaseKey = 'sb_publishable_z4iuk3_6_aEKRzlyyucH_g_ZgYrG17r'

export const supabase = createClient(supabaseUrl, supabaseKey)
