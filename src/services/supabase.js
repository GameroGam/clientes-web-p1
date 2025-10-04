import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

const SUPABASE_URL = 'https://jjwqqkfqlykaxkztfnxa.supabase.co';
const SUPABASE_KEY = 'sb_publishable_g7-tiuzYhbOsMkQR3xgkjQ_etk64EJ3';


export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

