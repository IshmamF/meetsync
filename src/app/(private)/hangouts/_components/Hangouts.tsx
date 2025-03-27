"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getApiBase } from "@/utils/etc/apiBase";
import HangoutList from './HangoutList'
import { useUser } from "@/utils/context/userContext";
import SearchBar from './Searchbar';

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
            setHangouts(data.hangouts.slice(0, 3));
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
        fetchHangouts();
      }, []);

    return (
        <div className="flex flex-col pt-10 bg-lightBlue min-h-screen text-black w-full px-10">
            <div className="font-semibold text-5xl mb-6 pb-8">Hangouts</div>
            <HangoutList
            name="Lunch"
            title="Tavern on the Green"
            scheduled_time="Apr 15 2025 at 3:00 pm"
            location="Central Park West & 67th Street"
            attendees={4}
      />
        </div>
    );
}