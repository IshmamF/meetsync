"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { Participant } from "./Hangouts";
import { XIcon } from "@/app/components/Icons";
import { getApiBase } from "@/utils/etc/apiBase";
import toast from "react-hot-toast";
import { useUser } from "@/utils/context/userContext";
import SearchBar from "../../friends/_components/SearchBar";
import { findPeople, Suggestions } from "../../friends/actions";
import Friends, { Friend } from "../../friends/_components/Friends";

type AddFriendModalProps = {
  isOpen: boolean;
  friends: string[];
  onClose(): void;
  //   onClose: () => void;
  //   hangoutId: number;
};

const TIMER: number = 150; // ms

const AddFriendModal = ({ isOpen, friends, onClose }: AddFriendModalProps) => {
  if (!isOpen) return null;
  const [people, setPeople] = useState<Suggestions>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const user = useUser();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // debounce
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      // make api call
      const username = e.target.value;
      console.log(username);
      if (username.trim() === "" || !username) {
        setPeople([]);
        return;
      }
      const suggestions = await findPeople(e.target.value);
      if (Array.isArray(suggestions)) {
        setPeople(
          suggestions.filter((person) => !friends.includes(person.auth_id))
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
    }
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          hello world
          <div className=" flex flex-col items-start justify-center bg-lightBlue rounded-lg p-6 w-full max-w-[900px] mx-4 relative border-2 border-darkBlue">
            <div className="ml-auto cursor-pointer " onClick={onClose}>
              <XIcon />
            </div>
            <div className="w-full flex items-center justify-center  mb-2">
              <p className="font-extrabold text-3xl text-darkBlue pb-4">
                Search for a friend
              </p>
            </div>
            <SearchBar
              placeholder="Type here.."
              value=""
              onChange={handleChange}
            />
            <div className="flex flex-col items-center justify-center w-full mb-2">
              {people.map((person) => {
                return (
                  <div key={person.auth_id}>
                    {person.username} -{" "}
                    <button
                      onClick={() => {
                        sendFriendRequest(person.auth_id);
                      }}
                      className="rounded border-2"
                    >
                      add friend
                    </button>{" "}
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
