"use client";

import InfoModal from "@/app/components/infoModal";
import Hangouts from "./_components/Hangouts";
import { informationStrings } from "@/utils/etc/informationStrings";

export default function Page() {
  return (
    <div className="relative">
      <Hangouts />
      <InfoModal information={informationStrings.hangouts} size={36} />
    </div>
  );
}
