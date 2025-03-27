"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getApiBase } from "@/utils/etc/apiBase";
import HangoutList from "./HangoutList";
import { useUser } from "@/utils/context/userContext";

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
  const user = useUser();

  async function fetchHangouts() {
    const base = getApiBase();
    const response = await fetch(`${base}/get-hangouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user?.auth_id,
      }),
    });

    if (response.ok) {
      const data = (await response.json()) as FetchHangoutsResponse;
      if (data.status === 200) {
        setHangouts(data.hangouts);
      } else {
        toast.error("Failed to fetch hangouts", {
          duration: TOAST_DURATION,
        });
      }
    } else {
      toast.error("Error fetching hangouts", {
        duration: TOAST_DURATION,
      });
    }
  }

  useEffect(() => {
    if (user?.auth_id) {
      fetchHangouts();
    }
  }, [user]);

  return (
    <div className="flex flex-col pt-10 bg-lightBlue min-h-screen text-black w-full px-10">
      <div className="font-semibold text-5xl mb-6 pb-8">Hangouts</div>

      {hangouts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {hangouts.map((hangout) => (
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
