"use server";

import { createClient } from "@/utils/supabase/server";

export async function signup(formData: Record<string, string>) {
  const supabase = await createClient();

  const data_ = {
    email: formData.email,
    password: formData.password,
  };

  const response = await supabase.auth.signUp(data_);
  if (response.error) return response.error.message;

  const userId = response.data.user?.id;

  const { error } = await supabase.from('users').insert({
    auth_id: userId, 
    username: formData.name.toLowerCase(),
  });

  if (error) return error.message;

  return 'success';
}

export async function checkUsernameExists(username: String) {
  const supabase = await createClient();

  const {data, error} = await supabase.from('users').select('username').eq('username', username.trim().toLowerCase());

  if (error) {
    console.error("Error checking username:", error);
    return {'success': false, "error": error.message};
  }

  if (data && data.length > 0) {
    return {'success': true, "exists": true};
  } else {
    return {'success': true, "exists": false};
  }
}