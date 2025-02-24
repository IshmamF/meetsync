"use server";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: Record<string, string>) {
  const supabase = await createClient();

  const data_ = {
    email: formData.email,
    password: formData.password,
  };

  const { data, error } = await supabase.auth.signInWithPassword(data_);
  if (error) {
    return {"success": false, "errorMsg": error.message};
  }
  return {"success": true, "data": data.user};
}
