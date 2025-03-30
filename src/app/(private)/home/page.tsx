"use client";

import { useUser } from "@/utils/context/userContext";
import React, { ChangeEvent, useState } from "react";
import UserSearchBar from "./components/UserSearchBar";
import HomeBottom from "./components/Home";
import { getApiBase } from "@/utils/etc/apiBase";

export type Attendee = {
  uuid: string | null;
  email: string | null;
  username: string | null;
};

function Home() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [title, setTitle] = useState<string>("");

  const user = useUser();

  function addAttendee(newAttendee: Attendee) {
    if (attendees.some((attentee) => attentee.uuid == newAttendee.uuid)) {
      return;
    }
    setAttendees((prevAttendees) => [...prevAttendees, newAttendee]);
  }

  function removeAttendee(attendeeId: string) {
    setAttendees((prevAttendees) =>
      prevAttendees.filter((attendee) => attendee.uuid != attendeeId)
    );
  }

  async function createHangout() {
    // todo , add better checks
    if (!title || title.trim() === "") {
      console.error("Title can not be empty.");
      return;
    }

    // todo , add better checks
    if (attendees.length == 0) {
      console.error("Attendees ");
    }
    const base = getApiBase();
    const response = await fetch(`${base}/new-hangout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creator_username: user?.username,
        creator_id: user?.auth_id,
        invitee_ids: attendees.map((attendee) => attendee.uuid),
        title: title.trim(),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setAttendees([]);
      setTitle("");
    }

    if (!response.ok) {
      const error = await response.json();
      console.error(error);
    }
  }

  return (
    <div className="grid h-screen grid-rows-[auto_auto_1fr] bg-lightBlue">
      <div className="bg-lightBlue w-full h-[auto] flex flex-col items-start justify-center p-20">
        <p className="text-3xl pb-2 text-darkBlue font-medium">Start Hangout</p>
        <div className="flex flex-col items-start justify-center w-full h-full mt-3 border-[3px] border-darkBlue p-6 pb-6 rounded-lg">
          <div className="w-[100%] flex flex-col pl-8 pr-8 pb-6">
            <p className="text-2xl text-darkBlue font-medium">Title</p>
            <input
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
              }}
              className="w-full mt-2 placeholder:text-slate-400 text-black text-lg border border-slate-200 rounded-md px-3 py-[12px] transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type Here..."
            />
          </div>
          <div className="w-[100%]  pl-8 pr-8 text-darkBlue">
            <p className="text-2xl font-medium">Attendees</p>
            <UserSearchBar
              attendees={attendees}
              addAttendee={addAttendee}
              removeAttendee={removeAttendee}
            />
          </div>

          <div className="flex items-start justify-center mt-6">
            <button
              onClick={createHangout}
              className={`text-lg font-medium border-2 w-[150px] h-[53px] rounded-2xl ml-8 ${
                title == "" || attendees.length == 0
                  ? "border-gray-400 text-gray-400 bg-gray-200 cursor-not-allowed opacity-50"
                  : "border-darkBlue text-darkBlue bg-gold"
              }`}
            >
              Start Hangout
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-10 mt-[-50px]">
        <HomeBottom />
      </div>
    </div>
  );
}

export default Home;
