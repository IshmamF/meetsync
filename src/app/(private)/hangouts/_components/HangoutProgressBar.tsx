import React from "react";

interface HangoutProgressBarProps {
  currentStageIndex: number; 
  completed: number;
  total: number;
  stages: number;
  flowStatus: string;
}

const stageLabels = [
  "Submit Availability",     // 0
  "Vote on Availability",    // 1
  "Confirm Details",         // 2
  "Vote on Location",        // 2
  "Confirm Location",        // 3
  "Completed"                // 4
];

export default function HangoutProgressBar({
  currentStageIndex,
  completed,
  total,
  stages,
  flowStatus,
}: HangoutProgressBarProps) {
  const label =
    flowStatus === "pending-confirm-details"
      ? "Confirm Details"
      : stageLabels[currentStageIndex] ?? "Progress";

  const showRemaining =
    currentStageIndex !== stageLabels.length - 1 && total - completed > 0;

  return (
    <div className="flex flex-col items-center mt-2 mb-1">
      <span className="text-xs text-gray-600 font-medium mb-1">
        {label}
        {showRemaining && <> • {total - completed} remaining</>}
      </span>
      <div className="flex space-x-1">
        {Array.from({ length: stages }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-2 rounded-sm transition-colors duration-200 ${
              (i < currentStageIndex || i === currentStageIndex && currentStageIndex === stages - 1)
                ? "bg-yellow-500"
                : i === currentStageIndex
                ? "bg-yellow-300"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
