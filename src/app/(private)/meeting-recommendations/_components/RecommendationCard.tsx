"use client";

import { Star, Car, Footprints, Train, Bike, Info } from "lucide-react";

export type UserInfo = {
  name: string;
  time: string;
  transport: "car" | "pedestrian" | "transit" | "cycling";
};

export type RecommendationCardProps = {
  name: string;
  type: string;
  rating: number;
  users: UserInfo[];
};

export default function RecommendationCard({
  name,
  type,
  rating,
  users,
}: RecommendationCardProps) {
  const transportIcons = {
    car: <Car className="w-4 h-4 inline mr-1" />, 
    pedestrian: <Footprints className="w-4 h-4 inline mr-1" />,
    transit: <Train className="w-4 h-4 inline mr-1" />,
    cycling: <Bike className="w-4 h-4 inline mr-1" />,
  };

  return (
    <div className="bg-lightBlue rounded-xl border border-black shadow p-6 w-full max-w-md h-[270px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
            <p className="text-sm text-gray-500">{type}</p>
            <div className="flex items-center mt-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm font-medium text-black">{rating}</span>
            </div>
          </div>
          <Info className="w-8 h-8 text-black fill-gray-500" />
        </div>

        <div className="mt-4 space-y-1">
          {users.map((user, index) => (
            <div key={index} className="flex justify-between text-sm text-black">
              <div className="flex items-center">
                {transportIcons[user.transport] || null}
                <span>{user.name}</span>
              </div>
              <span>{user.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <label className="text-sm text-black font-medium">Ranking:</label>
        <select className="p-2 border border-gray-300 bg-lightBlue rounded-md text-sm text-black">
          <option>Choose Rank</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
    </div>
  );
}