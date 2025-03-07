"use client";

import { Attendee } from "@/app/home/page";
import { supabase } from "@/utils/supabase/client";
import { Search, CircleX } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

type UserSearchBarProps = {
  attendees: Attendee[];
  addAttendee(newAttendee: Attendee): void;
  removeAttendee(attendeeId: string): void;
};

function UserSearchBar({
  attendees,
  addAttendee,
  removeAttendee,
}: UserSearchBarProps) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Attendee[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const autocompleteRef = useRef<HTMLDivElement>(null); // Reference for click detection

  async function seachUsers(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);

    if (query === "") {
      setResults([]);
      return;
    }

    const results = await fetch(
      `http://0.0.0.0:8000/friends-autocomplete/?query=${query}&uuid=${uuid}`
    );
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      onClick={() => {
        if (results.length >= 1) {
          setIsOpen(true);
        }
      }}
      ref={autocompleteRef}
      className="flex mt-4 flex-col items-center justify-start w-full bg-white placeholder:text-slate-400 text-black text-lg border border-slate-200 rounded-md px-3 py-1 transition duration-300 ease w-[1100px]"
    >
      <div className="relative  pl-4 pr-6 flex items-center justify-center w-full ">
        <Search />
        <div className="relative flex w-full flex-col">
          <input
            value={query}
            onChange={seachUsers}
            className="focus:outline-none h-[40px] pl-2 w-full"
            placeholder="Enter your friend's name here..."
          />
          {/* suggestions box */}
          {isOpen && (
            <div className="absolute top-[34px] bg-gray-200   w-full flex flex-col">
              {results?.map((item: Attendee) => (
                <div
                  key={item.auth_id}
                  onClick={() => {
                    if (item && item.username) {
                      addAttendee(item);
                      setIsOpen(false);
                      setResults([]);
                      setQuery("");
                    }
                  }}
                  className="flex flex-col w-full border-b-2  "
                >
                  <p className="ml-2 mt-3">{item.username}</p>
                  <p className="ml-2 mb-2 text-sm opacity-50">{item.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap w-full gap-3 pl-10 mt-2">
        {attendees.map((user) => {
          return (
            <div
              key={user.auth_id}
              className="flex items-center justify-start border-2 text-darkBlue border-gold rounded-2xl p-2 h-auto inline-block pr-3"
            >
              {user.username}

              <CircleX
                onClick={() => {
                  if (user && user.auth_id) {
                    removeAttendee(user.auth_id);
                  }
                }}
                className="pl-2"
                color="red"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserSearchBar;
