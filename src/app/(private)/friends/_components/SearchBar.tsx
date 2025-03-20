"use client";
import React, { ChangeEvent } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

export default function SearchBar({
  placeholder,
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="flex items-center w-1/3 p-2 border border-black rounded-md mb-4 self-start bg-white">
      <div>
        <Search />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="flex-grow outline-none bg-transparent"
      />
    </div>
  );
}
