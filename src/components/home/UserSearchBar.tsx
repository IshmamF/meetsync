import { Search, CircleX } from "lucide-react";
import React from "react";

type UserSearchBarProps = {
  users: string[];
};

function UserSearchBar({ users }: UserSearchBarProps) {
  return (
    <div className="flex items-center justify-start w-full bg-white placeholder:text-slate-400 text-black text-lg border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease w-[1100px]">
      <Search />
      {/* <div className="flex wrap gap-2 max-w-[700px] h-[1000px] bg-color-red-200 w-auto"> */}
      <div className="pl-5 flex flex-wrap w-[800px] gap-3">
        {/* <div className="pl-5 flex flex-wrap w-[800px] gap-3"> */}
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
      <div className="">
        <input
          className="bg-red-500 focus:outline-none "
          placeholder="Enter your friend's name here..."
        />
      </div>
    </div>
  );
}

export default UserSearchBar;
