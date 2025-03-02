"use server";

import { createClient } from "@/utils/supabase/server";

export async function signup(formData: Record<string, string>) {
  const supabase = await createClient();

  const data_ = {
    email: formData.email,
    password: formData.password,
  };

  const response = await supabase.auth.signUp(data_);
  if (response.error) return {status: 500, message : response.error.message};

  const userId = response.data.user?.id;

  const { error } = await supabase.from('users').insert({
    auth_id: userId, 
    username: formData.name.toLowerCase(),
  });

  if (error) return {status: 500, message : error.message};

  return {status: 201,  message : "Successfully created user"};
}

export async function checkUsernameExists(username: String) {
  const supabase = await createClient();

  const {data, error} = await supabase.from('users').select('username').eq('username', username.trim().toLowerCase());

  if (error) {
    console.error("Error checking username:", error);
    return {status: 500, error: error.message};
  }
  console.log(data)
  if (data && data.length > 0) {
    return {status: 409};
  } else {
    return {status: 200};
  }
}