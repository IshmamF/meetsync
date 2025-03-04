"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Loading from "../components/loading";
import Navbar from "../components/navbar";
import { ReactNode } from "react";

export default function GuestLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function redirectUser() {
      const response = await supabase.auth.getUser();
      let user = response.data.user;
      if (!user) {
        setLoading(false);
      } else {
        router.push("/home");
      }
    }
    redirectUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar type="guest" />
      {children}
    </>
  );
}
