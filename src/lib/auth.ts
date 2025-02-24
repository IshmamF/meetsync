import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createClient } from "@/utils/supabase/server";
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';

const GOOGLE_CLIENT = process.env.CLIENT_ID;
const GOOGLE_SECRET = process.env.CLIENT_SECRET;

/*
Documentation Referenced:
Supabase X NextAuth - https://authjs.dev/getting-started/adapters/supabase?framework=next-js
Refresh Token - https://authjs.dev/guides/refresh-token-rotation?framework=next-js
*/

export const authOptions: NextAuthOptions = {
    debug: true,
    session: {
        strategy: 'jwt'
    },
    providers: [GoogleProvider({
        clientId: GOOGLE_CLIENT as string,
        clientSecret: GOOGLE_SECRET as string,
        authorization: {
            params: {
                prompt: 'consent',
                access_type: "offline",
                response_type: "code",
                scope: "https://www.googleapis.com/auth/calendar.calendarlist.readonly openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
            }
        },
    })],
    callbacks: {
        async jwt({ token, account, user }) {
            const supabase = await createClient();
            const { data } = await supabase.auth.getUser();
            const AccountInfo = data['user'];
            if (!AccountInfo) redirect('/login');
            if (account) {
                // First-time login, save the `access_token`, its expiry and the `refresh_token`
                const { data, error } = await supabase
                            .schema('next_auth')
                            .from('accounts')
                            .upsert({
                    user_id: AccountInfo.id,
                    email: user.email,
                    profile_img: user.image,
                    access_token: account.access_token!,
                    expires_at: account.expires_at!,
                    refresh_token: account.refresh_token!,
                });
                if (error) throw error;
                return {
                    ...token,
                    email: user.email ,
                    profile_img: user.image,
                    access_token: account.access_token || token.access_token || "",
                    expires_at: account.expires_at || token.expires_at || Math.floor(Date.now() / 1000 + 86400),
                    refresh_token: account.refresh_token || token.refresh_token || "",
                };
            } else if (token.expires_at && Date.now() < token.expires_at * 1000) {
                // Subsequent logins, but the `access_token` is still valid
                return token
            } else {
                // Subsequent logins, but the `access_token` has expired, try to refresh it
                if (!token.refresh_token) throw new TypeError("Missing refresh_token")
         
                try {
                  // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
                  // at their `/.well-known/openid-configuration` endpoint.
                  // i.e. https://accounts.google.com/.well-known/openid-configuration
                  const response = await fetch("https://oauth2.googleapis.com/token", {
                    method: "POST",
                    body: new URLSearchParams({
                      client_id: GOOGLE_CLIENT!,
                      client_secret: GOOGLE_SECRET!,
                      grant_type: "refresh_token",
                      refresh_token: token.refresh_token!,
                    }),
                  })
         
                  const tokensOrError = await response.json()
         
                  if (!response.ok) throw tokensOrError
         
                  const newTokens = tokensOrError as {
                    access_token: string
                    expires_in: number
                    refresh_token?: string
                  }

                  const { data, error } = await supabase
                  .schema('next_auth')
                  .from('accounts')
                  .upsert({
                        user_id: AccountInfo.id,
                        email: user.email,
                        profile_img: user.image,
                        access_token: newTokens.access_token!,
                        expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
                        refresh_token: newTokens.refresh_token!,
                    });
                    if (error) throw error
         
                  return {
                    ...token,
                    email: user.email ,
                    profile_img: user.image,
                    access_token: newTokens.access_token,
                    expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
                    // Some providers only issue refresh tokens once, so preserve if we did not get a new one
                    refresh_token: newTokens.refresh_token
                      ? newTokens.refresh_token
                      : token.refresh_token,
                  }
                } catch (error) {
                  console.error("Error refreshing access_token", error)
                  // If we fail to refresh the token, return an error so we can handle it on the page
                  token.error = "RefreshTokenError"
                  return token
                }
            }
        },
        async session({ session, token }) {
            const supabase = await createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) redirect('/login');
            const { data, error } = await supabase
                            .schema('next_auth')
                            .from('accounts')
                            .select('expires_at, refresh_token')
                            .eq('user_id', user.id)
                            .single();
            if (error) {
              toast.error("Calendar account doesn't exist", {duration:2000});
              redirect('/google');
            };
            const {expires_at, refresh_token} = data!;
            if (expires_at * 1000 < Date.now()) {
                // If the access token has expired, try to refresh it
                try {
                  // https://accounts.google.com/.well-known/openid-configuration
                  // We need the `token_endpoint`.
                  const response = await fetch("https://oauth2.googleapis.com/token", {
                    method: "POST",
                    body: new URLSearchParams({
                      client_id: GOOGLE_CLIENT!,
                      client_secret: GOOGLE_SECRET!,
                      grant_type: "refresh_token",
                      refresh_token: refresh_token,
                    }),
                  });
         
                  const tokensOrError = await response.json();
         
                  if (!response.ok) throw tokensOrError;
         
                  const newTokens = tokensOrError as {
                    access_token: string
                    expires_in: number
                    refresh_token?: string
                  };
         
                  const {error} = await supabase.schema('next_auth').from('accounts').update({
                    access_token: newTokens.access_token,
                    expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
                    refresh_token: newTokens.refresh_token ?? refresh_token,
                  }).eq('user_id', user.id);

                  if (error) throw error;
                } catch (error) {
                  console.error("Error refreshing access_token", error);
                  // If we fail to refresh the token, return an error so we can handle it on the page
                  session.error = token.error
                }
              }
              return session;   
        },
    },
};

declare module "next-auth" {
    interface Session {
      error?: "RefreshTokenError"
    }
}
  

declare module "next-auth/jwt" {
    interface JWT {
      access_token: string
      expires_at: number
      refresh_token?: string
      error?: "RefreshTokenError"
    }
}
  
