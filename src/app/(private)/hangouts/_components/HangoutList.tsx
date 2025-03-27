"use client";
import React from 'react';

interface HangoutListProps {
    name: string;
    title: string;
    scheduled_time: string;
    location: string;
    attendees: number;
}

export default function HangoutList({ name, title, scheduled_time, location, attendees }: HangoutListProps) {
    return (
        <div className="flex items-center border border-black rounded-lg p-4 shadow-md space-x-4 w-full max-w-full">
            <div className="w-14 h-14 bg-gray-300 rounded-full border border-yellow-500"></div>
            <div className="flex-grow text-lg font-semibold">{name}</div>
        </div>
    );
}