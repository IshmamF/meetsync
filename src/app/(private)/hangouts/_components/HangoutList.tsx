"use client";
import React from 'react';

interface HangoutListProps {
  name: string;
  title: string;
  scheduled_time: string;
  location: string;
  attendees: number;
}

export default function HangoutList({ name, title, scheduled_time, location, attendees }: HangoutListProps) {
  return (
    <div className="flex items-center justify-between border border-black rounded-lg p-4 shadow-md w-full max-w-full">
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{title}</span>
          <span className="text-gray-600">• {location}</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {Array.from({ length: attendees }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 bg-gray-300 rounded-full border border-yellow-500 -ml-2 first:ml-0"
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">{attendees} attendee{attendees !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="text-sm bg-yellow-200 text-gray-800 font-medium px-3 py-1 rounded-md whitespace-nowrap">
        {scheduled_time}
      </div>
    </div>
  );
}
