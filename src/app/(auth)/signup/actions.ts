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
    username: formData.name,
  });

  if (error) return error.message;

  return 'success';
}