"use client";
import Link from "next/link";
import { Bell, CircleUser } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ProfileDropdown from "./profileDropdown";

export default function Navbar({ type }: { type: string }) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    };

    if (dropdown) {
      document.addEventListener("mouseup", handleClickOutside);
    } else {
      document.removeEventListener("mouseup", handleClickOutside);
    }
    
  }, [dropdown]);

  return (
    <div>
      {type == "guest" ? (
        <div className="bg-darkBlue w-100vw text-lightBlue flex justify-between font-extrabold py-4 px-8">
          <Link href="/" className="text-gold text-4xl">
            MeetSync
          </Link>
          <ul className="flex gap-6 text-2xl flex-row items-center">
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
            <ul className="flex gap-6 text-2xl flex-row items-center">
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
                className={`hover:text-gold cursor-pointer ${dropdown ? "text-gold" : ""}`}
                onClick={() => setDropdown(!dropdown)}
              >
                <CircleUser size="40" />
              </li>
            </ul>
          </div>
          {dropdown && (
            <div ref={dropdownRef}>
              <ProfileDropdown />
            </div>
          )}
        </div>
      )}
    </div>
  );
}