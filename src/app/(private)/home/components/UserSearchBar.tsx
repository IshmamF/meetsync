"use client";

import { Attendee } from "@/app/(private)/home/page";
import { useUser } from "@/utils/context/userContext";
import { supabase } from "@/utils/supabase/client";
import { Search, CircleX } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

export type Person = {
  uuid: string | null;
  email: string | null;
  username: string | null;
};

type UserSearchBarProps = {
  people: Person[];
  add(newAttendee: Person): void;
  remove(attendeeId: string): void;
  showSelection: boolean;
};

function UserSearchBar({
  people,
  add,
  remove,
  showSelection,
}: UserSearchBarProps) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Attendee[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const autocompleteRef = useRef<HTMLDivElement>(null); // Reference for click detection
  const user = useUser();

  async function seachUsers(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);

    if (query === "") {
      setResults([]);
      return;
    }

    const response = await fetch(
      `/api/friends-autocomplete/?query=${query}&authenticated_user_uuid=${user?.auth_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data: { suggestions: Attendee[] } = await response.json();
      if (data.suggestions.length >= 1) {
        setResults(data.suggestions);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(true);
      }
    }
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
      className="border-2 border-darkBlue flex mt-2 flex-col items-center justify-start w-full bg-white placeholder:text-slate-400 text-black text-lg border border-slate-200 rounded-md px-3 transition duration-300 ease w-[1100px]"
    >
      <div className="relative pl-4 pr-6 flex items-center justify-center w-full ">
        <div className="relative flex w-full flex-col">
          <div className="flex items-center justify-content pt-1">
            <Search size={20} className="mr-2" />
            <input
              value={query}
              onChange={seachUsers}
              className="focus:outline-none h-[40px] pl-1 w-full"
              placeholder="Enter your friend's name here..."
            />
          </div>
          {/* suggestions box */}
          {isOpen && results.length > 0 && (
            <ul className="absolute top-[38px] z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-white dark:ring-opacity-10 sm:text-sm">
              {results.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    if (item && item.username) {
                      add(item);
                      setIsOpen(false);
                      setResults([]);
                      setQuery("");
                    }
                  }}
                  className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
                >
                  {item.username}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {showSelection && people && (
        <div className="flex flex-wrap w-full gap-3 pl-10 mt-2">
          {people.map((user) => {
            return (
              <div
                key={user.uuid}
                className="flex items-center justify-start border-2 text-darkBlue border-gold rounded-2xl p-2 h-auto inline-block pr-3"
              >
                {user.username}

                <CircleX
                  onClick={() => {
                    if (user && user.uuid) {
                      remove(user.uuid);
                    }
                  }}
                  className="pl-2"
                  color="red"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserSearchBar;
