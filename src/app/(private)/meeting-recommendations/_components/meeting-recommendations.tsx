"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "@/utils/context/userContext";
import { getApiBase } from "@/utils/etc/apiBase";
import RecommendationCard from "./RecommendationCard";
import { ChevronDown } from "lucide-react";

const TOAST_DURATION = 2000;

interface RecommendationLocation {
  latitude: number;
  longitude: number;
}

interface Recommendation {
  id: number;
  hangout_id: number;
  name: string;
  address: string;
  location: RecommendationLocation;
  numVotes: number;
  created_at: string;
}

interface FetchRecommendationsResponse {
  status: number;
  recommendations: Recommendation[];
}

interface Participant {
  id: number;
  hangout_id: number;
  user_id: string;
  status: string;
  created_at: string;
  start_address: string;
  transport: string;
  travel_time: number;
  user: {
    username: string;
  };
}

interface FetchParticipantsResponse {
  status: number;
  participants: Participant[];
}

export default function MeetingRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const hangoutId = 47; // Temporary for testing

  async function fetchRecommendations() {
    setLoading(true);
    const base = getApiBase();

    try {
      const [recRes, partRes] = await Promise.all([
        fetch(`${base}/get-recommendations?hangout_id=${hangoutId}`),
        fetch(`${base}/get-hangout-participants`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hangout_id: hangoutId.toString() }),
        }),
      ]);

      const recData: FetchRecommendationsResponse = await recRes.json();
      const partData: FetchParticipantsResponse = await partRes.json();

      if (recData.status === 200) {
        setRecommendations(recData.recommendations);
      } else {
        toast.error("Failed to fetch recommendations", { duration: TOAST_DURATION });
      }

      if (partData.status === 200) {
        setParticipants(partData.participants);
      } else {
        toast.error("Failed to fetch participants", { duration: TOAST_DURATION });
      }
    } catch (error) {
      toast.error("Error fetching data", { duration: TOAST_DURATION });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.auth_id) {
      fetchRecommendations();
    }
  }, [user]);

  const evenRows: Recommendation[][] = [];
  for (let i = 0; i < recommendations.length - 1; i += 2) {
    evenRows.push(recommendations.slice(i, i + 2));
  }

  const hasOddCard = recommendations.length % 2 !== 0;
  const lastCard = hasOddCard ? recommendations[recommendations.length - 1] : null;

  function mapTransport(transport: string): "car" | "transit" | "pedestrian" | "cycling" {
    if (transport.includes("driving")) return "car";
    if (transport.includes("cycling")) return "cycling";
    if (transport.includes("walk")) return "pedestrian";
    return "transit";
  }

  const userData = participants.map((p) => ({
    name: p.user.username,
    time: `${p.travel_time} min`,
    transport: mapTransport(p.transport),
  }));

  return (
    <div className="flex flex-col pt-10 bg-lightBlue min-h-screen text-black w-full px-10">
      <div className="flex justify-center mb-6 pb-8">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-5xl">Meeting Recommendations</h1>
          <button className="bg-yellow-500 text-black font-medium border-black shadow-md px-4 py-2 rounded-full flex items-center gap-x-2">
            <span>Sort by</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-600 text-lg mt-10">Loading recommendations...</div>
      ) : recommendations.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-10">No recommendations found.</div>
      ) : (
        <>
          {evenRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-6 mb-6 flex-wrap">
              {row.map((card, idx) => (
                <RecommendationCard
                  key={`${rowIndex}-${idx}`}
                  name={card.name}
                  type="Cafe"
                  rating={4.5}
                  users={userData}
                />
              ))}
            </div>
          ))}

          {hasOddCard && lastCard && (
            <div className="flex justify-center mb-6">
              <RecommendationCard
                name={lastCard.name}
                type="Cafe"
                rating={4.5}
                users={userData}
              />
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button className="bg-yellow-500 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md shadow">
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}