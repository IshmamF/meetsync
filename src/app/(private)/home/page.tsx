"use client";

import { useUser } from "@/utils/context/userContext";
import React, { ChangeEvent, useState } from "react";
import UserSearchBar from "./components/UserSearchBar";

export type Attendee = {
  uuid: string | null;
  email: string | null;
  username: string | null;
};

function Home() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const user = useUser();

  function addAttendee(newAttendee: Attendee) {
    setAttendees((prevAttendees) => [...prevAttendees, newAttendee]);
  }

  function removeAttendee(attendeeId: string) {
    setAttendees((prevAttendees) =>
      prevAttendees.filter((attendee) => attendee.uuid != attendeeId)
    );
  }

  async function createHangout() {
    // todo , add better checks
    if (!title || title === "") {
      console.error("Title can not be empty.");
      return;
    }

    // todo , add better checks
    if (attendees.length == 0) {
      console.error("Attendees ");
    }

    const response = await fetch(`http://0.0.0.0:8000/new-hangout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creator_username: user?.username,
        creator_id: user?.auth_id,
        invitee_ids: attendees.map((attendee) => attendee.uuid),
        title: title.trim(),
        date_range_start: startDate,
        date_range_end: endDate,
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
    <div className="grid h-screen grid-rows-[340px_auto_1fr]">
      <div className="bg-lightBlue w-full h-[340px] flex flex-col items-start justify-center p-20">
        <p className="text-3xl pb-2 text-darkBlue font-medium">Start Hangout</p>
        <div className="flex w-full h-full mt-3 border-[3px] border-darkBlue p-6 pb-6 rounded-lg">
          <div className="w-[15%]">
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
          <div className="w-[30%]  pl-10 text-darkBlue">
            <p className="text-2xl font-medium">Attendees</p>
            <UserSearchBar
              attendees={attendees}
              addAttendee={addAttendee}
              removeAttendee={removeAttendee}
            />
          </div>
          <div className="w-[230px]  pl-10 text-darkBlue">
            <p className="text-2xl font-medium">Start Date</p>
            <input
              aria-label="Date"
              type="date"
              className="w-full h-[50px] p-[20px] mt-2 rounded-md placeholder:text-slate-400 text-black transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </div>
          <div className="w-[230px]  pl-10 text-darkBlue">
            <p className="text-2xl font-medium">End Date</p>
            <input
              aria-label="Date"
              type="date"
              className="w-full h-[50px] p-[20px] mt-2 rounded-md placeholder:text-slate-400 text-black transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </div>
          <div className="flex items-start justify-center mt-10">
            <button
              onClick={createHangout}
              className={`text-lg font-medium border-2 w-[150px] h-[53px] rounded-2xl ml-10 ${
                title == "" || attendees.length == 0 || !startDate || !endDate
                  ? "border-gray-400 text-gray-400 bg-gray-200 cursor-not-allowed opacity-50"
                  : "border-darkBlue text-darkBlue bg-gold"
              }`}
            >
              Start Hangout
            </button>
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-center">
        <p className="">Middle Section (Auto Height)</p>
      </div>

      <div className="flex items-center justify-center">
        <p className="text-lg">Footer (Remaining Height)</p>
      </div>
    </div>
  );
}

export default Home;
