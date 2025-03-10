"use server";
import { createClient } from "@/utils/supabase/server";

export async function SaveUserPrefData(formData: Record<string, string>) {
  const supabase = await createClient(); 

  const { data: {user}} = await supabase.auth.getUser();

  if (!user?.id) {
    console.error("User not authenticated");
    return {status: 401, error: "User not authenticated" };
  }

  const { error } = await supabase
  .from("users")
  .update({
      home_address: formData.address,
      default_transport: formData.transport,
      updated_at: new Date(), 
  })
  .eq('auth_id', user.id);


  if (error) {
    console.error("Error storing form data:", error);
    return {status: 500, error: "Database error" };
  }
  return {status: 200, success: "Updated or Inserted transport/address data"};
}