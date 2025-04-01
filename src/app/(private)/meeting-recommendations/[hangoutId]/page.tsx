"use client";

import { useParams } from "next/navigation";
import MeetingRecommendations from "../_components/meeting-recommendations";

export default function PageWrapper() {
  const params = useParams();
  const hangoutId = params.hangoutId;

  if (!hangoutId || typeof hangoutId !== "string") {
    return <div>Invalid or missing hangout ID.</div>;
  }

  return (
    <div>
      <MeetingRecommendations hangoutId={hangoutId} />
    </div>
  );
}
