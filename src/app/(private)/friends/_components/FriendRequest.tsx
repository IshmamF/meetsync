"use client";
import React from 'react';

interface FriendRequestProps {
    name: string;
    onAccept: () => void;
    onDeny: () => void;
}

export default function FriendRequest({ name, onAccept, onDeny }: FriendRequestProps) {
    {/* Display the pending label only when the friend request is actually pending */}
    return (
        <div className="flex items-center border border-black rounded-lg p-4 shadow-md space-x-4 w-full max-w-full ">
            <div className="w-14 h-14 bg-gray-300 rounded-full border border-yellow-500"></div>
            <div className="flex flex-col flex-grow">
                <div className="text-lg font-semibold">{name}</div>
                <span className="text-black text-sm font-medium bg-yellow-200 px-2 py-1 rounded self-start">Pending</span>
            </div>
            <div className="flex space-x-2">
                <button className="bg-green-500 text-black px-4 py-2 rounded-md border border-black" onClick={onAccept}>Accept</button>
                <button className="bg-red-500 text-black px-4 py-2 rounded-md border border-black" onClick={onDeny}>Deny</button>
            </div>
        </div>
    );
}