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
      {flowStatus === "pending-time-vote" ? (
        <Link
          href={`/availability/${id}`}
          className="border-darkBlue border rounded-md px-3 py-1 cursor-pointer hover:bg-gold transition-all duration-300 ease-in-out"
        >
          Vote on Availability
        </Link>
      ) : flowStatus === "pending-location-vote" ? (
        <button className="border-darkBlue border rounded-md px-3 py-1 cursor-pointer hover:bg-gold transition-all duration-300 ease-in-out">
          Vote on Location
        </button>
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
