export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ai_analysis: {
        Row: {
          ai_recommendation: string | null
          analysis_details: Json | null
          application_id: string
          confidence_level: number | null
          document_authenticity_score: number | null
          eligibility_match_score: number | null
          forgery_indicators: Json | null
          id: string
          missing_information: string[] | null
          ocr_results: Json | null
          processed_at: string
        }
        Insert: {
          ai_recommendation?: string | null
          analysis_details?: Json | null
          application_id: string
          confidence_level?: number | null
          document_authenticity_score?: number | null
          eligibility_match_score?: number | null
          forgery_indicators?: Json | null
          id?: string
          missing_information?: string[] | null
          ocr_results?: Json | null
          processed_at?: string
        }
        Update: {
          ai_recommendation?: string | null
          analysis_details?: Json | null
          application_id?: string
          confidence_level?: number | null
          document_authenticity_score?: number | null
          eligibility_match_score?: number | null
          forgery_indicators?: Json | null
          id?: string
          missing_information?: string[] | null
          ocr_results?: Json | null
          processed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_analysis_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          application_id: string | null
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          user_id: string | null
          validator_address: string | null
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          user_id?: string | null
          validator_address?: string | null
        }
        Update: {
          application_id?: string | null
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          user_id?: string | null
          validator_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          additional_info: Json | null
          applicant_address: string | null
          applicant_email: string
          applicant_name: string
          blockchain_address: string | null
          blockchain_tx_hash: string | null
          created_at: string
          description: string | null
          documents_count: number | null
          gpa: number | null
          graduation_date: string | null
          id: string
          institution: string
          phone_number: string | null
          status: string
          student_id: string | null
          submitted_at: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          additional_info?: Json | null
          applicant_address?: string | null
          applicant_email: string
          applicant_name: string
          blockchain_address?: string | null
          blockchain_tx_hash?: string | null
          created_at?: string
          description?: string | null
          documents_count?: number | null
          gpa?: number | null
          graduation_date?: string | null
          id?: string
          institution: string
          phone_number?: string | null
          status?: string
          student_id?: string | null
          submitted_at?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          additional_info?: Json | null
          applicant_address?: string | null
          applicant_email?: string
          applicant_name?: string
          blockchain_address?: string | null
          blockchain_tx_hash?: string | null
          created_at?: string
          description?: string | null
          documents_count?: number | null
          gpa?: number | null
          graduation_date?: string | null
          id?: string
          institution?: string
          phone_number?: string | null
          status?: string
          student_id?: string | null
          submitted_at?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          application_id: string
          arweave_hash: string | null
          document_type: string
          file_size: number | null
          file_type: string
          filename: string
          id: string
          ipfs_hash: string | null
          metadata: Json | null
          upload_status: string | null
          uploaded_at: string
        }
        Insert: {
          application_id: string
          arweave_hash?: string | null
          document_type: string
          file_size?: number | null
          file_type: string
          filename: string
          id?: string
          ipfs_hash?: string | null
          metadata?: Json | null
          upload_status?: string | null
          uploaded_at?: string
        }
        Update: {
          application_id?: string
          arweave_hash?: string | null
          document_type?: string
          file_size?: number | null
          file_type?: string
          filename?: string
          id?: string
          ipfs_hash?: string | null
          metadata?: Json | null
          upload_status?: string | null
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      nft_certificates: {
        Row: {
          application_id: string
          blockchain_tx_hash: string
          certificate_data: Json
          id: string
          metadata_uri: string | null
          minted_at: string
          token_address: string
          token_id: string
        }
        Insert: {
          application_id: string
          blockchain_tx_hash: string
          certificate_data: Json
          id?: string
          metadata_uri?: string | null
          minted_at?: string
          token_address: string
          token_id: string
        }
        Update: {
          application_id?: string
          blockchain_tx_hash?: string
          certificate_data?: Json
          id?: string
          metadata_uri?: string | null
          minted_at?: string
          token_address?: string
          token_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nft_certificates_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          application_id: string | null
          created_at: string
          email_sent: boolean | null
          id: string
          message: string
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          email_sent?: boolean | null
          id?: string
          message: string
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          application_id?: string | null
          created_at?: string
          email_sent?: boolean | null
          id?: string
          message?: string
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      rejection_analysis: {
        Row: {
          application_id: string
          can_appeal: boolean | null
          can_resubmit: boolean | null
          created_at: string
          detailed_analysis: string
          evidence: Json | null
          id: string
          rejection_reason: string
        }
        Insert: {
          application_id: string
          can_appeal?: boolean | null
          can_resubmit?: boolean | null
          created_at?: string
          detailed_analysis: string
          evidence?: Json | null
          id?: string
          rejection_reason: string
        }
        Update: {
          application_id?: string
          can_appeal?: boolean | null
          can_resubmit?: boolean | null
          created_at?: string
          detailed_analysis?: string
          evidence?: Json | null
          id?: string
          rejection_reason?: string
        }
        Relationships: [
          {
            foreignKeyName: "rejection_analysis_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      validator_votes: {
        Row: {
          application_id: string
          blockchain_tx_hash: string | null
          id: string
          reasoning: string | null
          stake_amount: number | null
          validator_address: string
          vote: string
          vote_weight: number | null
          voted_at: string
        }
        Insert: {
          application_id: string
          blockchain_tx_hash?: string | null
          id?: string
          reasoning?: string | null
          stake_amount?: number | null
          validator_address: string
          vote: string
          vote_weight?: number | null
          voted_at?: string
        }
        Update: {
          application_id?: string
          blockchain_tx_hash?: string | null
          id?: string
          reasoning?: string | null
          stake_amount?: number | null
          validator_address?: string
          vote?: string
          vote_weight?: number | null
          voted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "validator_votes_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
