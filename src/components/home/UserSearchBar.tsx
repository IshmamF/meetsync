import { supabase } from "@/utils/supabase/client";
import { Search, CircleX } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

type UserSearchBarProps = {
  users: string[];
};

function UserSearchBar({ users }: UserSearchBarProps) {
  const [query, setQuery] = useState<string>();
  const [results, setResults] = useState<Array<object>>();

  async function seachUsers(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);

    const { data, error } = await supabase
      .from("users")
      .select("username")
      .ilike("username", `%${query}%`);

    if (error) {
      console.error(error);
    } else {
      setResults(data);
    }
  }
  console.log(results);

  return (
    <div className="flex flex-col items-center justify-start w-full bg-white placeholder:text-slate-400 text-black text-lg border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease w-[1100px]">
      <div className="pl-4 pr-6 flex items-center justify-center w-full mb-4">
        <Search />
        <div className="flex w-full flex-col">
          <input
            value={query}
            onChange={seachUsers}
            className=" bg-red-400 focus:outline-none h-[40px] pl-2 w-full"
            placeholder="Enter your friend's name here..."
          />
          <div className="w-full flex flex-col ">
            {results?.map((item) => (
              <div className="flex flex-col w-full border-b-2  ">
                <p className="ml-2 mt-3">hello</p>
                <p className="ml-2 text-sm opacity-50">world</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap w-[900px] gap-3 pl-4">
        {users.map((user) => {
          return (
            <div
              key={user}
              className="flex items-center justify-start border-2 text-darkBlue border-gold rounded-2xl p-2 h-auto inline-block pr-3"
            >
              {user}

              <CircleX className="pl-2" color="red" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserSearchBar;
