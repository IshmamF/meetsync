'use client'
import { useState } from "react";
import TimeAddressForm from "./timeAddressForm";

export default function ConfirmTimePopUp() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <>
      <div className="flex gap-3 ">
        <button
          onClick={openPopup}
          className="bg-green-500 hover:bg-green-600 text-black font-medium px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
        >
          Confirm
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-black font-medium px-4 py-2 rounded-lg shadow-md transition-colors duration-200">
          Decline
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-lightBlue rounded-lg p-6 w-full max-w-md mx-4 relative border-2 border-darkBlue">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="mb-4">
              <h2 className="font-extrabold text-3xl text-darkBlue pb-4">
                Confirm Time and Place
              </h2>
            </div>
            <TimeAddressForm />
          </div>
        </div>
      )}
    </>
  );
}