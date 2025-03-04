"use client";
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    placeholder: string;
}

export default function SearchBar({ placeholder }: SearchBarProps) {
    return (
        <div className="flex items-center w-1/3 p-2 border border-black rounded-md mb-4 self-start bg-white">
            <div>
              <Search />
            </div>
            <input 
                type="text" 
                placeholder={placeholder} 
                className="flex-grow outline-none bg-transparent"
            />
        </div>
    );
}