"use client";
import { useState } from "react";

interface Hangout {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
}

export default function UpcomingHangouts() {
  // Mock data for UI testing
  const [hangouts] = useState<Hangout[]>([
    {
      id: 1,
      title: "Coffee Chat",
      date: "12/14/24",
      time: "3:00 PM",
      location: "Union Square Cafe on E 19 St.",
      attendees: 3,
    },
    {
      id: 2,
      title: "Friends Christmas Dinner",
      date: "12/22/24",
      time: "6:30 PM",
      location: "Sal’s on Main Street",
      attendees: 7,
    },
    {
      id: 3,
      title: "Brunch",
      date: "12/28/24",
      time: "11:00 AM",
      location: "Big Apple Brunch on 48th St.",
      attendees: 4,
    },
  ]);

  return (
    <div className="flex flex-grow flex-col items-start border-[3px] border-darkBlue rounded-lg p-4 shadow-md space-y-4 w-full">
      {hangouts.map((hangout, index) => (
        <div key={hangout.id} className={`flex justify-between w-full items-center pl-8 pr-8 pb-3 ${index === 0 ? "pt-4" : ""} 
            ${index !== hangouts.length ? "border-b border-darkBlue" : ""}`}>
          <div>
            <h3 className="text-md font-bold">{hangout.title}</h3>
            <p className="text-sm text-gray-600">
              {hangout.date} at {hangout.time} • {hangout.location}
            </p>
          </div>
  
          <div className="flex items-center">
            {Array.from({ length: hangout.attendees }).map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 bg-gray-300 rounded-full border border-yellow-500 -ml-2 first:ml-0"
              />
            ))}
          </div>
        </div>
      ))}
      <div className="mt-4"></div>
  
      <button className="mt-4 w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">
        View All Events
      </button>
    </div>
  );
  
}
