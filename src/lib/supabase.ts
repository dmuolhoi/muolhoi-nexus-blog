
import { supabase } from '@/integrations/supabase/client';

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

export { supabase };
