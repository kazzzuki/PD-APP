import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"
import config from "./supabase"

// Better put your these secret keys in .env file
export const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_SECRET,
  {
    localStorage: AsyncStorage,
    detectSessionInUrl: false, // Prevents Supabase from evaluating window.location.href, breaking mobile
  }
)
