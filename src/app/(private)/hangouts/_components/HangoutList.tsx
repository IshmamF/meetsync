"use client";

import React, { useState, useEffect } from "react";
import HangoutActionButton from "./HangoutActionButton";
import ConfirmLocationModal from "../_components/FinalConfirmationModal";
import HangoutProgressBar from "./HangoutProgressBar";
import { Participant } from "./Hangouts";
import { getApiBase } from "@/utils/etc/apiBase";

interface HangoutListProps {
  name: string;
  id: string;
  title: string;
  scheduled_time: string;
  location: string;
  attendees: number;
  flowStatus: string;
  participants: Participant[];
}

const flowStatusIndexMap: Record<string, number> = {
  "pending-time-input": 0,
  "pending-time-vote": 1,
  "pending-confirm-time": 2,
  "pending-location-vote": 3,
  "pending-confirm-location": 4,
  "accepted-final-confirmation": 5,
};

const knownStages = Object.keys(flowStatusIndexMap);

export default function HangoutList({
  name,
  id,
  title,
  scheduled_time,
  location,
  attendees,
  flowStatus,
  participants,
}: HangoutListProps) {
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const [progress, setProgress] = useState<{
    currentStageIndex: number;
    completed: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    async function fetchHangoutProgress() {
      try {
        const res = await fetch(`${getApiBase()}/get_hangout_progress/${id}`);
        const data = await res.json();

        if (data.status === 200) {
          const stageKey = data.current_stage;
          if (knownStages.includes(stageKey)) {
            setProgress(prev => ({
              currentStageIndex: flowStatusIndexMap[stageKey],
              completed: data.stage_count,
              total: data.total_count,
            }));
          } else {
            setProgress(prev => prev ?? null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch hangout progress:", err);
      }
    }

    fetchHangoutProgress();
  }, [id]);

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

        {progress && (
          <HangoutProgressBar
            currentStageIndex={progress.currentStageIndex}
            completed={progress.completed}
            total={progress.total}
            stages={5} 
            flowStatus={flowStatus} 
          />
        )}

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
