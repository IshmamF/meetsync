"use client"

import type React from "react"

import { Calendar } from "@/components/ui/calendar"

interface Props {
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  date: Date | undefined
}

export default function SelectDay({ date, setDate }: Props) {
  return (
    <div>
      <h2 className="font-bold text-2xl text-darkBlue pb-2">Select Date</h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        fromDate={new Date()}
        classNames={{
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_outside: "text-muted-foreground",
        }}
      />
      <div className="mt-2 text-sm text-muted-foreground">
        {date?.toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}
      </div>
    </div>
  )
}

