"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { CheckIcon, XIcon } from "@/app/components/Icons";
import { getApiBase } from "@/utils/etc/apiBase";
import toast from "react-hot-toast";
import { useUser } from "@/utils/context/userContext";
import SearchBar from "../../friends/_components/SearchBar";
import { findPeople, Suggestions } from "../../friends/actions";

type AddFriendModalProps = {
  isOpen: boolean;
  friends: string[];
  pendingFriends: string[];
  onClose(rerender: boolean): void; // closes modal
};

const TIMER: number = 150; // ms

const AddFriendModal = ({
  isOpen,
  friends,
  onClose,
  pendingFriends,
}: AddFriendModalProps) => {
  if (!isOpen) return null;
  const [people, setPeople] = useState<Suggestions>([]);
  const [requestSent, setRequestSent] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const user = useUser();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // debounce
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      const username = e.target.value;
      if (username.trim() === "" || !username) {
        setPeople([]);
        return;
      }
      const suggestions = await findPeople(e.target.value);

      if (Array.isArray(suggestions)) {
        setPeople(
          suggestions.filter((person) => {
            if (!user) {
              return;
            }
            return (
              !friends.includes(user.auth_id) && person.auth_id != user?.auth_id
            );
          })
        );
      }
    }, TIMER);
  };

  const sendFriendRequest = async (idToAdd: string) => {
    const base = getApiBase();
    const response = await fetch(`${base}/send-friend-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_A: user?.auth_id,
        user_B: idToAdd,
      }),
    });
    if (!response.ok) {
      console.error("Failed to add friend", response.statusText);
      toast.error("Error while sending friend request.");
    } else {
      toast.success("Successfully sent friend request.");
      setRequestSent((prev) => [...prev, idToAdd]);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" flex flex-col items-start justify-start bg-lightBlue rounded-lg p-6 w-full h-[700px] max-w-[900px] mx-4 relative border-2 border-darkBlue">
            <div
              className="ml-auto cursor-pointer "
              onClick={() => {
                onClose(requestSent.length > 0);
              }}
            >
              <XIcon />
            </div>
            <div className="w-full mt-4 flex items-center justify-center mb-2">
              <p className="font-extrabold text-3xl text-darkBlue pb-4">
                Search for a friend
              </p>
            </div>
            <div className="mb-0 w-full">
              <SearchBar
                placeholder="Type here.."
                value=""
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col items-center justify-start w-full h-[500px] overflow-auto mt-[50px]">
              {people.map((person) => {
                return (
                  <div
                    className="flex items-center justify-between w-full h-[50px] mb-4 border-black border-b-2 px-12"
                    key={person.auth_id}
                  >
                    <p className="text-[18px]">{person.username} </p>
                    {requestSent.includes(person.auth_id) ||
                    pendingFriends.includes(person.auth_id) ? (
                      <div className="flex items-center justify-center w-[25%]">
                        <CheckIcon />
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          sendFriendRequest(person.auth_id);
                        }}
                        className=" w-[25%] p-[3.5px] rounded border-black border-2 mb-2"
                      >
                        Send friend request
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddFriendModal;
