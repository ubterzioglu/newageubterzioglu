import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://pkbmcfpcvjmvjzqzixyc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYm1jZnBjdmptdmp6cXppeHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0OTQyMDgsImV4cCI6MjA4NjA3MDIwOH0.v94fKJeqH3rHhR1Pld_ABD7F8aGWiCtKr-acRGZ3GKI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
