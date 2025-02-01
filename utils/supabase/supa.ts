import { createClient } from "@supabase/supabase-js";

export const createSupaClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL;

  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL is not set");
  }

  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  return createClient(supabaseUrl, supabaseKey);
};
