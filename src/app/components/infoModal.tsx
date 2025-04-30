import { Info } from "lucide-react";
import React, { useState } from "react";

export default function InfoModal({
  information,
  size,
}: {
  information: string;
  size: number;
}) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      onClick={handleClick}
      className="absolute z-10 right-5 top-5 cursor-pointer"
    >
      <Info size={size} />
      {showModal && (
        <div className="absolute z-10 border border-jetBlack/40 bg-white rounded-xl shadow-lg p-4 mt-2 w-64 right-0">
          {information.split("\n").map((line, index) => (
            <p key={index} className="text-md text-jetBlack">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
