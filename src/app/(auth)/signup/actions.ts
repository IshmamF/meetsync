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

  return await supabase.auth.signUp(data_);
}