"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from 'next/navigation';

export async function signup(formData: Record<string, string>) {
  const supabase = await createClient();

  const data_ = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
      },
    },
  };

  const { data, error } = await supabase.auth.signUp(data_);
  if (error) {
    redirect('/error');
  }
  return data.user;
}
