"use client";
import React from 'react';
import { Calendar } from 'lucide-react';

export default function SyncCalendar() {
    return (
        <button className="bg-yellow-500 text-black font-medium border-black shadow-md px-6 py-3 rounded-md mt-4 flex items-center gap-x-3">
            <div>
              <Calendar />
            </div>
             Sync Calendar
        </button>
    );
}