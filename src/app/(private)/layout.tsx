"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Loading from "../components/loading";
import { UserProvider } from "@/utils/context/userContext";
import { ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import Navbar from "../components/navbar";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClient();

  const router = useRouter();

  useEffect(() => {
    async function redirectUser() {
      const response = await supabase.auth.getUser();
      if (response.data.user) {
        setUser(response.data.user);
        setLoading(false);
      } else {
        router.push("/login");
      }
    }
    redirectUser();
  }, []);

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
