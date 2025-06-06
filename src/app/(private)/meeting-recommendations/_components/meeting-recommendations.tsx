"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/utils/context/userContext";
import { getApiBase } from "@/utils/etc/apiBase";
import RecommendationCard from "./RecommendationCard";
import { ChevronDown } from "lucide-react";
import InfoModal from "@/app/components/infoModal";
import { informationStrings } from "@/utils/etc/informationStrings";

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

export default function MeetingRecommendations({ hangoutId }: { hangoutId: string }) {
  const router = useRouter();
  const user = useUser()!;
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRanks, setSelectedRanks] = useState<{ [id: number]: number }>({});

  async function fetchRecommendations() {
    setLoading(true);
    const base = getApiBase();

    try {
      const [recRes, partRes] = await Promise.all([
        fetch(`${base}/get-recommendations?hangout_id=${hangoutId}`),
        fetch(`${base}/get-hangout-participants?hangout_id=${hangoutId}`),
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
    fetchRecommendations();
  }, []);

  const evenRows: Recommendation[][] = [];
  for (let i = 0; i < recommendations.length - 1; i += 2) {
    evenRows.push(recommendations.slice(i, i + 2));
  }

  const hasOddCard = recommendations.length % 2 !== 0;
  const lastCard = hasOddCard ? recommendations[recommendations.length - 1] : null;

  function mapTransport(transport: string): "car" | "transit" | "pedestrian" | "cycling" {
    if (transport.includes("driving")) return "car";
    if (transport.includes("cycling")) return "cycling";
    if (transport.includes("walking")) return "pedestrian";
    return "transit";
  }

  const userData = participants.map((p) => ({
    name: p.user.username,
    time: `${p.travel_time} min`,
    transport: mapTransport(p.transport),
  }));

  const rankingOptions = Array.from({ length: recommendations.length }, (_, i) => i + 1);

  const handleRankChange = (recId: number, rank: number) => {
    setSelectedRanks((prev) => ({ ...prev, [recId]: rank }));
  };

  const handleSubmitVotes = async () => {
    const base = getApiBase();
    const voteEntries = Object.entries(selectedRanks);

    if (voteEntries.length === 0) {
      toast.error("No votes to submit");
      return;
    }

    const ranks = voteEntries.map(([, rank]) => rank);
    const uniqueRanks = new Set(ranks);

    if (uniqueRanks.size !== ranks.length) {
      toast.error("Each recommendation must have a unique rank.");
      return;
    }

    try {
      const response = await fetch(`${base}/submit-batch-votes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.auth_id,
          votes: voteEntries.map(([recommendation_id, rank]) => ({
            recommendation_id: Number(recommendation_id),
            rank,
          })),
        }),
      });

      const data = await response.json();
      if (data.status === 200) {
        toast.success("All votes submitted!");
        setTimeout(() => router.push("/hangouts"), TOAST_DURATION);
      } else {
        toast.error(data.message || "Something went wrong submitting votes.");
      }
    } catch (err) {
      toast.error("Network error submitting votes");
    }
  };

  return (
    <div className="flex flex-col pt-10 bg-lightBlue min-h-screen text-black w-full px-10">
      <div className="relative flex justify-center mb-6 pb-8">
        <InfoModal information={informationStrings.meetingRecsVoting} size={36} />
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-5xl">Meeting Recommendations</h1>
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
                  id={card.id}
                  name={card.name}
                  type="Cafe"
                  rating={4.5}
                  users={userData}
                  rankingOptions={rankingOptions}
                  userId={user.auth_id}
                  selectedRank={selectedRanks[card.id] ?? null}
                  onRankChange={(rank) => handleRankChange(card.id, rank)}
                />
              ))}
            </div>
          ))}

          {hasOddCard && lastCard && (
            <div className="flex justify-center mb-6">
              <RecommendationCard
                id={lastCard.id}
                name={lastCard.name}
                type="Cafe"
                rating={4.5}
                users={userData}
                rankingOptions={rankingOptions}
                userId={user.auth_id}
                selectedRank={selectedRanks[lastCard.id] ?? null}
                onRankChange={(rank) => handleRankChange(lastCard.id, rank)}
              />
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmitVotes}
              className="bg-yellow-500 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md shadow"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
