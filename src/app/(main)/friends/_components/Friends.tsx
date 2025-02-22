"use client";
import React from 'react';
import FriendRequest from './FriendRequest';
import FriendList from './FriendList';
import AddFriendButton from './AddFriendButton';

const pendingRequests = ["Ishmam Fardin"];
const friends = ["Mansij Mishra", "Olu Kukoyi"];

export default function Friends() {
    return (
        <div className="flex flex-col pt-10 bg-lightBlue min-h-screen text-black w-full px-10">
            <div className="font-semibold text-5xl mb-6">Friends</div>
            <input 
                type="text" 
                placeholder="Search friends..." 
                className="w-1/3 p-2 border border-black rounded-md mb-4 self-start"
            />
            <div className="w-full space-y-4 max-w-6xl">
                {pendingRequests.map((name, index) => (
                    <FriendRequest key={index} name={name} onAccept={() => {}} onDeny={() => {}} />
                ))}
                {friends.map((name, index) => (
                    <FriendList key={index} name={name} onRemove={() => {}} />
                ))}
            </div>
            <div className="flex w-full max-w-6xl">
                <AddFriendButton />
            </div>
        </div>
    );
}