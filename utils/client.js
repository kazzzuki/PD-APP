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
    console.log(new Date(), " | Operator ID does not exist")
    return false
  } else {
    console.log(`${new Date()} | Logging in Operator ${id}`)
    return data.length > 0
  }
}

export async function getImageURL(image_path) {
  const { data, error } = supabase.storage
    .from("AlertImages")
    .getPublicUrl(image_path)
  if (error) {
    console.log(new Date(), " | Cannot fetch image public URL")
    return null
  } else {
    console.log(new Date(), " | URL fetch: ", image_path)
    return data.publicUrl
  }
}

export async function resolveAlert(uid) {
  const { error } = await supabase
    .from("Alerts")
    .update({ is_resolved: true })
    .eq("uid", uid)
  if (error) {
    console.log(new Date(), " | Unable to resolve alert")
  }
}
