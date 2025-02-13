import { google } from "googleapis";

export async function CalendarOAuth() {
    console.log('whatsup')
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URL = process.env.REDIRECT_URL;
  
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