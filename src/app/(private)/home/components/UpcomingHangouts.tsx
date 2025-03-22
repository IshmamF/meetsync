"use client";
import { useEffect, useState } from "react";
import { getApiBase } from "@/utils/etc/apiBase";
import { useUser } from "@/utils/context/userContext";
import { toast } from "react-hot-toast";

interface Hangout {
  id: string;
  title: string;
  scheduled_time: string;
  location: string;
  attendees: number;
}

type FetchHangoutsResponse = {
  status: number;
  hangouts: Hangout[];
};

const TOAST_DURATION = 2000;

export default function UpcomingHangouts() {
  const [hangouts, setHangouts] = useState<Hangout[]>([]);
  const user = useUser();

  async function fetchHangouts() {
    const base = getApiBase();
    const response = await fetch(`${base}/get-hangouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user?.auth_id,
      }),
    });

    if (response.ok) {
      const data = (await response.json()) as FetchHangoutsResponse;
      if (data.status === 200) {
        setHangouts(data.hangouts.slice(0, 3));
      } else {
        toast.error("Failed to fetch hangouts", {
          duration: TOAST_DURATION,
        });
      }
    } else {
      toast.error("Error fetching hangouts", {
        duration: TOAST_DURATION,
      });
    }
  }

  useEffect(() => {
    fetchHangouts();
  }, []);

  return (
    <div className="flex flex-grow flex-col items-start border-[3px] border-darkBlue rounded-lg p-4 shadow-md space-y-4 w-full">
      {hangouts.map((hangout, index) => {
        let formattedDate = "TBD";
        let formattedTime = "TBD";

        if (hangout.scheduled_time) {
          const dateObj = new Date(hangout.scheduled_time);
          formattedDate = dateObj.toLocaleDateString();
          formattedTime = dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
        }

        const locationDisplay = hangout.location?.trim()
          ? hangout.location
          : "Location TBD";

        return (
          <div
            key={hangout.id}
            className={`flex justify-between w-full items-center pl-8 pr-8 pb-3 ${
              index === 0 ? "pt-4" : ""
            } ${index !== hangouts.length ? "border-b border-darkBlue" : ""}`}
          >
            <div>
              <h3 className="text-md font-bold">{hangout.title}</h3>
              <p className="text-sm text-gray-600">
                {formattedDate} at {formattedTime} • {locationDisplay}
              </p>
            </div>

            <div className="flex items-center">
              {Array.from({ length: hangout.attendees }).map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gray-300 rounded-full border border-yellow-500 -ml-2 first:ml-0"
                />
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-4"></div>

      <button className="mt-4 w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">
        View All Events
      </button>
    </div>
  );
}
