import React from "react";
import { Participant } from "./Hangouts";
import { XIcon } from "@/app/components/Icons";

type FinalConfirmationModallProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  location: string;
  time: string;
  participants: Participant[];
};

const FinalConfirmationModal = ({
  isOpen,
  onClose,
  title,
  location,
  time,
  participants,
}: FinalConfirmationModallProps) => {
  if (!isOpen) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" flex flex-col items-start justify-center bg-lightBlue rounded-lg p-6 w-full max-w-[900px] mx-4 relative border-2 border-darkBlue">
            <div className="ml-auto cursor-pointer " onClick={onClose}>
              <XIcon />
            </div>
            <div className="w-full flex items-center justify-center  mb-2">
              <p className="font-extrabold text-3xl text-darkBlue pb-4">
                {title}
              </p>
            </div>
            <div className="flex items-center justify-star w-full mb-2">
              <p className="text-2xl font-bold">Location:</p>
              <p className="text-2xl pl-2 ">{location} </p>
            </div>
            <div className="flex items-center justify-star w-full mb-2">
              <p className="text-2xl font-bold">Time:</p>
              <p className="text-2xl pl-2 ">{time} </p>
            </div>
            <div className="flex flex-wrap items-center justify-star w-full mb-2">
              <p className="text-2xl font-bold">Attendees:</p>
              {participants.map((participant, idx) => (
                <p key={participant.id} className="text-2xl pl-2 ">
                  {participant.user.username}
                  {idx < participants.length - 1 && ","}
                </p>
              ))}
              <p className="text-2xl pl-2 "></p>
            </div>
            <div className="w-full flex items-center justify-center gap-5 mt-6">
              <button
                // onClick={openPopup}
                className="w-[160px] bg-green-500 hover:bg-green-600 text-black font-medium px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
              >
                Confirm
              </button>
              <button
                // onSubmit={handleDecline}
                className="w-[160px] bg-red-500 hover:bg-red-600 text-black font-medium px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FinalConfirmationModal;
