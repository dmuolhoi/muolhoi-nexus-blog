
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          content: string
          published: boolean
          slug: string
          excerpt: string | null
          cover_image: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content: string
          published?: boolean
          slug: string
          excerpt?: string | null
          cover_image?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          content?: string
          published?: boolean
          slug?: string
          excerpt?: string | null
          cover_image?: string | null
        }
      }
      pages: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          content: string
          slug: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content: string
          slug: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          content?: string
          slug?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
