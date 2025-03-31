"use client";
import RecommendationCard from "./RecommendationCard";
import { ChevronDown } from "lucide-react";

// temporary data for testing
const rawCardsData = [
  {
    name: "Tavern on the Green",
    type: "Cafe",
    rating: 4.4,
    users: [
      { name: "User A", time: "14 min", transport: "car" },
      { name: "User B", time: "20 min", transport: "pedestrian" },
      { name: "User C", time: "18 min", transport: "transit" },
      { name: "User D", time: "22 min", transport: "cycling" },
    ] as const,
  },
  {
    name: "Central Park Cafe",
    type: "Cafe",
    rating: 4.5,
    users: [
      { name: "User A", time: "12 min", transport: "car" },
      { name: "User B", time: "18 min", transport: "pedestrian" },
    ] as const,
  },
  {
    name: "Central Park Boathouse",
    type: "Cafe",
    rating: 4.3,
    users: [
      { name: "User A", time: "10 min", transport: "car" },
      { name: "User B", time: "15 min", transport: "pedestrian" },
    ] as const,
  },
  {
    name: "Marea",
    type: "Cafe",
    rating: 4.5,
    users: [
      { name: "User A", time: "14 min", transport: "car" },
      { name: "User B", time: "16 min", transport: "pedestrian" },
    ] as const,
  },
  {
    name: "Le Pain Quotidien",
    type: "Cafe",
    rating: 4.2,
    users: [
      { name: "User A", time: "13 min", transport: "car" },
      { name: "User B", time: "19 min", transport: "pedestrian" },
    ] as const,
  },
];

const testCardsData = rawCardsData.map((card) => ({
  ...card,
  users: card.users.map((u) => ({ ...u })),
}));

export default function MeetingRecommendations() {
  const evenRows = [];
  for (let i = 0; i < testCardsData.length - 1; i += 2) {
    evenRows.push(testCardsData.slice(i, i + 2));
  }

  const hasOddCard = testCardsData.length % 2 !== 0;
  const lastCard = hasOddCard ? testCardsData[testCardsData.length - 1] : null;

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

      {testCardsData.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-10">
          No recommendations found.
        </div>
      ) : (
        <>
          {evenRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-6 mb-6 flex-wrap">
              {row.map((cardData, idx) => (
                <RecommendationCard
                  key={`${rowIndex}-${idx}`}
                  name={cardData.name}
                  type={cardData.type}
                  rating={cardData.rating}
                  users={cardData.users}
                />
              ))}
            </div>
          ))}
  
          {hasOddCard && lastCard && (
            <div className="flex justify-center mb-6">
              <RecommendationCard
                name={lastCard.name}
                type={lastCard.type}
                rating={lastCard.rating}
                users={lastCard.users}
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
