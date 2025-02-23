"use client";
import React from 'react';
import FriendRequest from './FriendRequest';
import FriendList from './FriendList';
import AddFriendButton from './AddFriendButton';
import SearchBar from './SearchBar';

const pendingRequests = ["Ishmam Fardin"];
const friends = ["Mansij Mishra", "Olu Kukoyi"];

export default function Friends() {
    return (
        <div className="flex flex-col pt-10 bg-lightBlue min-h-screen text-black w-full px-10">
            <div className="font-semibold text-5xl mb-6 pb-8">Friends</div>
            <div className="pb-8"><SearchBar placeholder=" Search friends..." /></div>
            <div className="w-full space-y-4 max-w-full pb-8">
            {pendingRequests.map((name) => (
                <div key={`pending-${name}`} className="pb-8">
                    <FriendRequest name={name} onAccept={() => {}} onDeny={() => {}} />
                </div>
            ))}
            {friends.map((name) => (
                <div key={`friend-${name}`} className="pb-8">
                    <FriendList name={name} onRemove={() => {}} />
                </div>
            ))}
            </div>
            <div className="flex w-full  justify-center">
                <AddFriendButton />
            </div>
        </div>
    );
}