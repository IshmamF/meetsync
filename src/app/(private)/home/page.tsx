"use client";

import UserSearchBar from "@/components/home/UserSearchBar";
import React, { ChangeEvent, useState } from "react";

export type Attendee = {
  auth_id: string | null;
  email: string | null;
  username: string | null;
};

function Home() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [title, setTitle] = useState<string>("");

  function addAttendee(newAttendee: Attendee) {
    setAttendees((prevAttendees) => [...prevAttendees, newAttendee]);
  }

  function removeAttendee(attendeeId: string) {
    setAttendees((prevAttendees) =>
      prevAttendees.filter((attendee) => attendee.auth_id != attendeeId)
    );
  }

  return (
    <div className="grid h-screen grid-rows-[500px_auto_1fr]">
      <div className="bg-blue-200 w-full h-[500px] flex flex-col items-start justify-center p-20">
        <p className="text-4xl pb-5 text-darkBlue">Start Hangout</p>
        <div className="flex w-full h-full mt-10">
          <div className="w-[15%]">
            <p className="text-5xl text-darkBlue">Title</p>
            <input
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
              }}
              className="w-full mt-4 placeholder:text-slate-400 text-black text-lg border border-slate-200 rounded-md px-3 py-[10px] transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type Here..."
            />
          </div>
          <div className="w-[30%]  pl-10 text-darkBlue">
            <p className="text-5xl">Attendees</p>
            <UserSearchBar
              attendees={attendees}
              addAttendee={addAttendee}
              removeAttendee={removeAttendee}
            />
          </div>
          <div className="flex items-start justify-center mt-[60px]">
            <button className="border-2 border-darkBlue text-darkBlue bg-gold w-[135px] h-[50px] rounded-2xl ml-10 ">
              Start Hangout
            </button>
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-center">
        <p className="">Middle Section (Auto Height)</p>
      </div>

      <div className="flex items-center justify-center">
        <p className="">Footer (Remaining Height)</p>
      </div>
    </div>
  );
}

export default Home;
