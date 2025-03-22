"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { UserRoundPlus } from "lucide-react";

export default function AddNewFriend() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/friends");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-yellow-500 text-black font-medium border-black shadow-md px-6 py-3 rounded-md mt-4 flex items-center gap-x-3"
    >
      <div>
        <UserRoundPlus />
      </div>
      Add New Friend
    </button>
  );
}
