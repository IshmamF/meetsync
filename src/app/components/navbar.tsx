"use client";
import Link from "next/link";
import { Bell, CircleUser } from "lucide-react";
import { useState } from "react";
import ProfileDropdown from "./profileDropdown";

export default function Navbar({ type }: { type: string }) {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div>
      {type == "guest" ? (
        <div className="bg-darkBlue w-100vw text-lightBlue hover:text-gold flex justify-between font-extrabold py-4 px-8">
          <Link href="/" className="text-gold text-4xl">
            MeetSync
          </Link>
          <ul className="flex gap-4 text-2xl flex-row items-center">
            <Link href="/about" className="hover:text-gold">
              About
            </Link>
            <Link href="/login" className="hover:text-gold">
              Login
            </Link>
            <Link href="/signup" className="hover:text-gold">
              Sign Up
            </Link>
          </ul>
        </div>
      ) : (
        <div>
          <div className="bg-darkBlue w-100vw text-lightBlue flex justify-between font-extrabold py-4 px-8">
            <Link href="/home" className="text-gold text-4xl">
              MeetSync
            </Link>
            <ul className="flex gap-4 text-2xl flex-row items-center">
              <Link href="/home" className="hover:text-gold">
                Home
              </Link>
              <Link href="/friends" className="hover:text-gold">
                Friends
              </Link>
              <Link href="/hangouts" className="hover:text-gold">
                Hangouts
              </Link>
              <Link href="/notifications" className="hover:text-gold">
                <Bell size="40" />
              </Link>
              <li
                className="hover:text-gold"
                onClick={() => setDropdown(!dropdown)}
              >
                <CircleUser size="40" />
              </li>
            </ul>
          </div>
          {dropdown && (
            <div className="fade-in">
              <ProfileDropdown />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
