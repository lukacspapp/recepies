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
      liked_meals: {
        Row: {
          created_at: string
          id: string
          meal_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          meal_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          meal_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "liked_meals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      meal_categories: {
        Row: {
          created_at: string
          description: string
          id: string
          image: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image?: string
          title?: string
        }
        Relationships: []
      }
      meal_cuisines: {
        Row: {
          created_at: string
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      meal_ingredients_measurements: {
        Row: {
          created_at: string
          id: string
          ingredient: string
          meal_id: string
          measurement: string
        }
        Insert: {
          created_at?: string
          id?: string
          ingredient: string
          meal_id: string
          measurement: string
        }
        Update: {
          created_at?: string
          id?: string
          ingredient?: string
          meal_id?: string
          measurement?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_ingredients_measurements_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          }
        ]
      }
      meal_ingridients: {
        Row: {
          created_at: string
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      meals: {
        Row: {
          category: string
          created_at: string
          creator_id: string | null
          cuisine: string
          description: string
          id: string
          image: string
          title: string
          updated_at: string | null
          video_link: string
        }
        Insert: {
          category: string
          created_at?: string
          creator_id?: string | null
          cuisine: string
          description: string
          id?: string
          image: string
          title: string
          updated_at?: string | null
          video_link: string
        }
        Update: {
          category?: string
          created_at?: string
          creator_id?: string | null
          cuisine?: string
          description?: string
          id?: string
          image?: string
          title?: string
          updated_at?: string | null
          video_link?: string
        }
        Relationships: [
          {
            foreignKeyName: "meals_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "meal_categories"
            referencedColumns: ["title"]
          },
          {
            foreignKeyName: "meals_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meals_cuisine_fkey"
            columns: ["cuisine"]
            isOneToOne: false
            referencedRelation: "meal_cuisines"
            referencedColumns: ["title"]
          }
        ]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
