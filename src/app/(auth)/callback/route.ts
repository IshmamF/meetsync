import { NextRequest, NextResponse } from 'next/server';
import { google } from "googleapis";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  
  const CLIENT_ID = process.env.CLIENT_ID!;
  const CLIENT_SECRET = process.env.CLIENT_SECRET!;
  const REDIRECT_URL = process.env.REDIRECT_URL!;
  
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  const { searchParams } = new URL(req.url);
  console.log(req.url)
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("/error");
  }


  try {
    const { tokens } = await oauth2Client.getToken(code); 
    oauth2Client.setCredentials(tokens);

    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      return NextResponse.redirect("/error");
    }

    const { error } = await supabase
      .from("user_google_accounts")
      .upsert({
        user_id: user.data.user.id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });

    if (error) {
      return NextResponse.redirect("/error");
    }

    return NextResponse.redirect("/");
  } catch (error) {
    console.error("OAuth Error:", error);
    return NextResponse.redirect("/error");
  }
}
