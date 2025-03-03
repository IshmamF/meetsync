"use client";
import { createContext, useContext } from "react";
import { User } from "@supabase/supabase-js";

const UserContext = createContext<User | null>(null);

interface UserProviderProps {
  value: User | null;
  children: React.ReactNode;
}

export const UserProvider = ({ value, children }: UserProviderProps) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
