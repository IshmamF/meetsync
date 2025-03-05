"use client";

import Input from "@/components/common/Input";
import UserSearchBar from "@/components/home/UserSearchBar";
import React, { useState } from "react";

function Home() {
  const [attendees, setAttendees] = useState<Array<string>>([
    "John Doe",
    "Olu Kukoyi",
    "Mr Krabs",
    "Mr Krabs",
    "Mr Krabs loves money",
    "Mr Krabs loves money",
    "Mr Krabs loves money",
    "Mr Krabs loves money",
    "Mr Krabs loves money",
    "Oluwanifesimi Kukoyi",
    // "Mr Kfit-contentfit-contentfit-contentfit-content",
  ]);

  return (
    <div className="grid h-screen grid-rows-[500px_auto_1fr]">
      {/* First Row - Fixed Height */}
      <div className="bg-blue-200 w-full h-[500px] flex flex-col items-start justify-center p-20">
        <p className="text-4xl pb-5 text-darkBlue">Start Hangout</p>
        <div className="flex w-full h-full">
          <div>
            <p className="text-3xl text-darkBlue">Title</p>
            <Input placeholder="Type Here..." />
          </div>
          <div className="pl-10 text-darkBlue">
            <p className="text-3xl">Attendees</p>
            <UserSearchBar users={attendees} />
          </div>
          <div className="flex items-start justify-center mt-10">
            <button className="border-2 border-darkBlue text-darkBlue bg-gold w-[135px] h-[50px] rounded-2xl ml-10 ">
              Start Hangout
            </button>
          </div>
        </div>
      </div>

      {/* Second Row - Takes Up As Much Height As Possible */}
      <div className=" flex items-center justify-center">
        <p className="">Middle Section (Auto Height)</p>
      </div>

      {/* Third Row - Remaining Height */}
      <div className="flex items-center justify-center">
        <p className="">Footer (Remaining Height)</p>
      </div>
    </div>
  );
}

export default Home;
