"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Loading from "../components/loading";
import { UserProvider } from "@/utils/context/userContext";
import { ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { PublicUser } from "@/utils/context/userContext";
import Navbar from "../components/navbar";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [user, setUser] = useState<PublicUser | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function redirectUser() {
      const response = await supabase.auth.getUser();
      if (response.data.user) {
        setAuthUser(response.data.user);
        setLoading(false);
      } else {
        router.push("/login");
      }
    }
    redirectUser();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const response = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser?.id);
      if (response.error) {
        console.error(response.error);
      } else {
        setUser(response.data[0]);
      }
    }
    fetchUser();
  }, [authUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <UserProvider value={user}>
      <Navbar type="private" />
      {children}
    </UserProvider>
  );
}
