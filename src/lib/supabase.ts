import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://gfkiglvdzkbynrzszggb.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_cli7-DvSo9LebwJsUXtVdQ_dg0D4TKg";

export const supabase = createClient(supabaseUrl, supabaseKey);

export type EnquiryInsert = {
  name: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  group_size?: number | null;
  preferred_week?: string | null;
  experience_level?: string | null;
  message?: string | null;
  source_page?: string | null;
};

export async function submitEnquiry(enquiry: EnquiryInsert) {
  const { error } = await supabase.from("enquiries").insert(enquiry);
  if (error) throw error;
}
