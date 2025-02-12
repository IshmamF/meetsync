"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from 'next/navigation';
import { headers } from 'next/headers'
import { google } from "googleapis";

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

export async function CalendarOAuth() {
  console.log('whatsup')
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URL = process.env.REDIRECT_URL;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline", 
    scope: ["https://www.googleapis.com/auth/calendar"], 
  });

  return authUrl;
}