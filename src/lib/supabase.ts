
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// These are placeholders - the user will need to replace with their Supabase credentials
// DO NOT put your actual Supabase credentials here
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  excerpt?: string;
  cover_image?: string;
};

export type Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  updated_at: string;
};
