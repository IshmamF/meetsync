"use client";
import React from 'react';
import { UserRoundPlus } from 'lucide-react';

export default function AddFriendButton() {
    return (
        <button className="bg-yellow-500 text-black border-black shadow-md px-6 py-3 rounded-md mt-4 flex items-center">
            <div>
              <UserRoundPlus />
            </div>
             Add New Friend
        </button>
    );
}