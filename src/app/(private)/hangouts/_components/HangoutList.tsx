"use client";
import React, { useState } from "react";
import HangoutActionButton from "./HangoutActionButton";
import ConfirmLocationModal from "../_components/FinalConfirmationModal";
import { Participant } from "./Hangouts";

interface HangoutListProps {
  name: string;
  id: string;
  title: string;
  scheduled_time: string;
  location: string;
  attendees: number;
  flowStatus: string;
  participants: Participant[];
  onUpdate(): void;
}

export default function HangoutList({
  name,
  id,
  title,
  scheduled_time,
  location,
  attendees,
  flowStatus,
  participants,
  onUpdate,
}: HangoutListProps) {
  const [isConfirmationModal, setIsConfirmationModal] =
    useState<boolean>(false);

  return (
    <>
      <ConfirmLocationModal
        hangoutId={Number(id)}
        isOpen={isConfirmationModal}
        onClose={() => setIsConfirmationModal(false)}
        title={title}
        time={scheduled_time}
        location={location}
        participants={participants}
        onUpdate={onUpdate}
      />
      <div className="flex flex-col border border-black rounded-lg p-4 shadow-md w-full max-w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{title}</span>
            <span className="text-gray-600">• {location}</span>
          </div>
          <div className="text-sm bg-yellow-200 text-gray-800 font-medium px-3 py-1 rounded-md">
            {scheduled_time}
          </div>
        </div>

        <div className="flex flex-row justify-between space-y-1">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {Array.from({ length: attendees }).map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-gray-300 rounded-full border border-yellow-500 -ml-2 first:ml-0"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {attendees} attendee{attendees !== 1 ? "s" : ""}
            </span>
          </div>
          <div>
            <HangoutActionButton
              showConfirmLocationModal={() => {
                setIsConfirmationModal(true);
              }}
              id={id}
              flowStatus={flowStatus}
              scheduled_time={scheduled_time}
            />
          </div>
        </div>
      </div>
    </>
  );
}
