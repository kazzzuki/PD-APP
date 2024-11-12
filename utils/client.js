import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import config from "./supabase"

export const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_SECRET,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)

export async function authUser(id) {
  const { data, error } = await supabase
    .from("Users")
    .select()
    .eq("operatorID", String(id))

  if (error) {
    console.log("Operator ID does not exist")
    return false
  } else {
    console.log(`Logging in Operator ${id}`)
    return data.length > 0
  }
}

export function fetchAlertsData() {
  console.log("Component mounted", alerts)
  return alerts
}
