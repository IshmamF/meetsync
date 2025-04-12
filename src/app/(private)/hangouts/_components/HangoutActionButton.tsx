"use client";
import React from "react";
import Link from "next/link";

interface HangoutActionButtonProps {
  id: string;
  flowStatus: string;
}

export default function HangoutActionButton({
  id,
  flowStatus,
}: HangoutActionButtonProps) {
  return (
    <div>
      {flowStatus === "pending-time-input" ? (
        <div className="border-darkBlue border rounded-md px-3 py-1 cursor-pointer hover:bg-gold transition-all duration-300 ease-in-out">
          <Link href={`/availability/${id}`}>Submit Availability</Link>
        </div>
      ) : flowStatus === "pending-time-vote" ? (
        <div className="border-darkBlue border rounded-md px-3 py-1 cursor-pointer hover:bg-gold transition-all duration-300 ease-in-out">
          <Link href={`/availability/${id}`}>Vote on Availability</Link>
        </div>
      ) : flowStatus === "pending-location-vote" ? (
        <div className="border-darkBlue border rounded-md px-3 py-1 cursor-pointer hover:bg-gold transition-all duration-300 ease-in-out">
          <Link href={`/meeting-recommendations/${id}`}>Vote on Location</Link>
        </div>
      ) : flowStatus === "pending-confirm-time" ? (
        <button className="border-darkBlue border rounded-md px-3 py-1 cursor-pointer hover:bg-gold transition-all duration-300 ease-in-out">
          Confirm Availability
        </button>
      ) : flowStatus === "pending-confirm-location" ? (
        <button className="border-darkBlue border rounded-md px-3 py-1 cursor-pointer hover:bg-gold transition-all duration-300 ease-in-out">
          Confirm Location
        </button>
      ) : null}
    </div>
  );
}
