"use client";
import { createContext, useContext } from "react";

export interface PublicUser {
  auth_id: string;
  username: string;
  email: string;
  home_address: string;
  default_transport: string;
}

const UserContext = createContext<PublicUser | null>(null);

interface UserProviderProps {
  value: PublicUser | null;
  children: React.ReactNode;
}

export const UserProvider = ({ value, children }: UserProviderProps) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);