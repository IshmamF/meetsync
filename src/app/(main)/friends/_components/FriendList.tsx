"use client";
import React from 'react';

interface FriendListProps {
    name: string;
    onRemove: () => void;
}

export default function FriendList({ name, onRemove }: FriendListProps) {
    return (
        <div className="flex items-center border border-black rounded-lg p-4 bg-white shadow-md space-x-4 w-full max-w-4xl">
            <div className="w-14 h-14 bg-gray-300 rounded-full border border-yellow-500"></div>
            <div className="flex-grow text-lg font-semibold">{name}</div>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md border border-black" onClick={onRemove}>Remove</button>
        </div>
    );
}