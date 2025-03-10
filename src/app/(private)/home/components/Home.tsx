"use client";
import React from 'react';
import UpcomingHangouts from "./UpcomingHangouts";
import AddNewFriend from './AddNewFriend';
import SyncCalendar from './SyncCalendar';
import ViewAllEvents from './ViewAllEvents';

export default function HomeBottom() {
    return (
        <div className="flex flex-col bg-lightBlue text-black w-full px-10">
            <p className="text-3xl pb-2 text-darkBlue font-medium">Upcoming Hangout</p>
            <div className="mt-6 mb-10">
                <UpcomingHangouts />
            </div>
            <div className="flex w-full justify-center space-x-16">
                <AddNewFriend />
                <SyncCalendar />
                <ViewAllEvents />
            </div>
        </div>
    );
}