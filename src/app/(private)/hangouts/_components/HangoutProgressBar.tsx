import React from "react";

interface HangoutProgressBarProps {
  currentStageIndex: number; 
  completed: number;
  total: number;
  stages: number; 
}

const stageLabels = [
  "Submit Availability",
  "Vote on Availability",
  "Vote on Location",
  "Confirm Location",
  "Completed"
];

export default function HangoutProgressBar({
  currentStageIndex,
  completed,
  total,
  stages,
}: HangoutProgressBarProps) {
  const label = stageLabels[currentStageIndex] || "Stage";

  return (
    <div className="flex flex-col items-center mt-2 mb-1">
      <span className="text-xs text-gray-600 font-medium mb-1">
        {label} {completed}/{total}
      </span>
      <div className="flex space-x-1">
        {Array.from({ length: stages }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-2 rounded-sm transition-colors duration-200 ${
              i < currentStageIndex
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
