import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://kqqpmbuvnionfxewosza.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcXBtYnV2bmlvbmZ4ZXdvc3phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3OTYyMzAsImV4cCI6MjA5NDM3MjIzMH0.8D6dPCX2sXy1oI0z_yk5iZOpKrujT95hisQ_srwxMNo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

export type Product = {
  id: string;
  name: string;
  price: string;
  original_price?: string;
  badge?: string;
  category?: string;
  description?: string;
  image_url?: string;
  available: boolean;
  featured: boolean;
  created_at: string;
};