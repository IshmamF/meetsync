"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";

export default function SyncCalendar() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/sync-calendar");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-yellow-500 text-black font-medium border-black shadow-md px-6 py-3 rounded-md mt-4 flex items-center gap-x-3"
    >
      <div>
        <Calendar />
      </div>
      Sync Calendar
    </button>
  );
}
