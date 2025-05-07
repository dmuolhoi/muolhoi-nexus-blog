
import { supabase } from './supabase';
import type { Post, Page } from './supabase';

// BLOG POSTS

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<Post> {
  const { data, error } = await supabase
    .from('posts')
    .insert([
      { 
        ...post, 
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString() 
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(id: string, post: Partial<Post>): Promise<Post> {
  const { data, error } = await supabase
    .from('posts')
    .update({ 
      ...post, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// PAGES

export async function getAllPages(): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('title');

  if (error) throw error;
  return data || [];
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updatePage(id: string, page: Partial<Page>): Promise<Page> {
  const { data, error } = await supabase
    .from('pages')
    .update({ 
      ...page, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Upload an image to Supabase Storage
export async function uploadImage(file: File, path: string): Promise<string | null> {
  // Check if storage bucket exists, create if not
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.find(bucket => bucket.name === 'blog-images')) {
    await supabase.storage.createBucket('blog-images', { public: true });
  }

  // Generate a unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  // Upload the file to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload(filePath, file);

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    throw uploadError;
  }

  // Get the public URL
  const { data } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Search posts
export async function searchPosts(query: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}
