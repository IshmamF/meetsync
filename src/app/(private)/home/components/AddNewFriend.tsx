"use client";
import React from 'react';
import { UserRoundPlus } from 'lucide-react';

export default function AddNewFriend() {
    return (
        <button className="bg-yellow-500 text-black font-medium border-black shadow-md px-6 py-3 rounded-md mt-4 flex items-center gap-x-3">
            <div>
              <UserRoundPlus />
            </div>
             Add New Friend
        </button>
    );
}