"use server";
import { createClient } from "@/utils/supabase/server";

export type Suggestions = {
  auth_id: string;
  username: string;
}[];

export async function findPeople(username: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    console.error("User not authenticated");
    return { status: 401, error: "User not authenticated" };
  }

  const { data, error } = await supabase
    .from("users")
    .select("auth_id, username")
    .ilike("username", `%${username}%`);

  return data as Suggestions;
}
