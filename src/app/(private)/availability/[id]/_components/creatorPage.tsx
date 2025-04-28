import { useState } from "react";
import AvailabilityModal from "./availPopUp";
import OptionCards from "./optionCards";
import { submitAvailabilityOptions } from "../actions";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import InfoModal from "@/app/components/infoModal";
import { informationStrings } from "@/utils/etc/informationStrings";

type Props = {
  title: string;
  hangout_id: string;
};

export default function CreatorPage({ title, hangout_id }: Props) {
  const [options, setOptions] = useState<string[]>([]);
  const [hitSubmit, setHitSubmit] = useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit() {
    if (options.length == 0) {
      toast.error("Please add your availability");
      return;
    }
    if (hitSubmit) {
      toast.error("Can only submit this once, please be patient");
      return;
    }
    setHitSubmit(true);
    try {
      const loadingToast = toast.loading("Submitting availability...");

      const response = await submitAvailabilityOptions(options, hangout_id);

      toast.dismiss(loadingToast);

      if (response.status == 200) {
        toast.success(
          response.message || "Availability submitted successfully!"
        );

        setTimeout(() => {
          router.push("/hangouts");
        }, 2000);
        setHitSubmit(false);
      } else {
        toast.error(
          response.message || "Something went wrong. Please try again."
        );
        setHitSubmit(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      setHitSubmit(false);
      console.error("Error submitting availability:", error);
    }
  }

  return (
    <div className="flex flex-col pt-10 min-h-screen text-black w-full px-10">
      <div className="flex justify-between mb-6 pb-2">
        <div className="font-semibold text-4xl">{title}</div>
        <div className="flex space-x-4">
          <AvailabilityModal setOptions={setOptions} options={options} />
          <button
            className="bg-darkBlue hover:bg-darkBlue/80 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
            onClick={handleSubmit}
          >
            {hitSubmit ? "Submitting..." : "Submit Availability"}
          </button>
        </div>
      </div>
      <div className="relative">
        <InfoModal
          information={informationStrings.availabilityInput}
          size={36}
        />
      </div>
      <OptionCards setOptions={setOptions} options={options} />
    </div>
  );
}
