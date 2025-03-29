"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getApiBase } from "@/utils/etc/apiBase";
import HangoutList from "./HangoutList";
import { useUser } from "@/utils/context/userContext";
import SearchBar from "./Searchbar";
import { ChevronDown } from "lucide-react";

interface Hangout {
  id: string;
  title: string;
  scheduled_time: string;
  location: string;
  attendees: number;
}

type FetchHangoutsResponse = {
  status: number;
  hangouts: Hangout[];
};

const TOAST_DURATION = 2000;

function formatScheduledTime(dateStr: string | null | undefined): string {
  if (!dateStr) return "TBD";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "TBD";

  return `${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })} at ${date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;
}

export default function Hangouts() {
  const [hangouts, setHangouts] = useState<Hangout[]>([]);
  const [query, setQuery] = useState<string>("");
  const [suggestion, setSuggestion] = useState<Hangout[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUser();

  async function fetchHangouts(name: string = "") {
    setLoading(true);
    const base = getApiBase();
    const response = await fetch(`${base}/fetch-hangouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: user?.auth_id,
        name: name,
      }),
    });

    if (response.ok) {
      const data = (await response.json()) as FetchHangoutsResponse;
      if (data.status === 200) {
        setHangouts(data.hangouts);
        setSuggestion(name ? data.hangouts : null);
      } else {
        toast.error("Failed to fetch hangouts", { duration: TOAST_DURATION });
      }
    } else {
      toast.error("Error fetching hangouts", { duration: TOAST_DURATION });
    }

    setLoading(false);
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setQuery(value);
    fetchHangouts(value);
  }

  useEffect(() => {
    if (user?.auth_id) {
      fetchHangouts(); 
    }
  }, [user]);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestion(null); 
    }
  }, [query]);

  const hangoutsToDisplay = suggestion ?? hangouts;

  return (
    <div className="flex flex-col pt-10 bg-lightBlue min-h-screen text-black w-full px-10">
      <div className="font-semibold text-5xl mb-6 pb-8">Hangouts</div>
  
      <div className="flex items-center justify-between w-full pb-8">
        <div className="w-2/3">
          <SearchBar
            value={query}
            onChange={handleSearchChange}
            placeholder="Search events..."
          />
        </div>
  
        <button className="bg-yellow-500 text-black font-medium border-black shadow-md px-6 py-1 rounded-md flex items-center gap-x-2">
          <span>All Events</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
  
      {loading ? (
        <div className="text-gray-500 text-lg">Loading hangouts...</div>
      ) : hangoutsToDisplay.length > 0 ? (
        <div className="flex flex-col gap-4">
          {hangoutsToDisplay.map((hangout) => (
            <HangoutList
              key={hangout.id}
              name={hangout.title}
              title={hangout.title}
              scheduled_time={formatScheduledTime(hangout.scheduled_time)}
              location={hangout.location}
              attendees={hangout.attendees}
            />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-lg">No hangouts found.</div>
      )}
    </div>
  );  
}
