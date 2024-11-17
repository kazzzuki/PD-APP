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

export async function deleteAlert(uid, img_path) {
  if (img_path.startsWith("default/")) {
    console.log("not deleting within default folder")
  } else {
    const { data, error } = await supabase.storage
      .from("AlertImages")
      .remove([img_path])
    if (error) {
      console.log(new Date(), " | Error - ", error)
      return
    }
  }
  const response = await supabase.from("Alerts").delete().eq("uid", uid)
  console.log(new Date(), " | ", response)
}

export async function broadcastGenerateTemplate() {
  const { error } = await supabase
    .from("functions")
    .update({ status: true })
    .eq("id", 1)
  if (error) {
    console.log(new Date(), " | Unable to call templateGenerate")
  } else {
    console.log(new Date(), " | Set templateGenerate to be called")
  }
}

export async function broadcastDebugCapture() {
  const { error } = await supabase
    .from("functions")
    .update({ status: true })
    .eq("id", 2)
  if (error) {
    console.log(new Date(), " | Unable to call templateGenerate")
  } else {
    console.log(new Date(), " | Set debugCapture to be called")
  }
}
