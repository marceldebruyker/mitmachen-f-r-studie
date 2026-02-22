import { createClient } from '@supabase/supabase-js';

export const getSupabase = () => {
    const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY || '';

    return createClient(supabaseUrl, supabaseAnonKey);
};
