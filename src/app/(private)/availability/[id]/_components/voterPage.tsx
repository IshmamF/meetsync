import { useState } from "react";
import Option from "./option";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/utils/context/userContext";
import { submitOptionVotes } from "../actions";
import { CircleCheck } from "lucide-react";
import InfoModal from "@/app/components/infoModal";
import { informationStrings } from "@/utils/etc/informationStrings";

interface Props {
  options: MeetupOption[];
  title: string;
  hangout_id: string;
}

type MeetupOption = {
  id: string;
  option: string;
};

export default function VoterPage({ options, title, hangout_id }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<MeetupOption[]>([]);
  const [hitSubmit, setHitSubmit] = useState<boolean>(false);
  const router = useRouter();
  const user = useUser();

  function handleSelectOption(option: MeetupOption) {
    setSelectedOptions((prev) => {
      if (selectedOptions.includes(option)) {
        return selectedOptions.filter((prevOption) => option != prevOption);
      } else {
        return [...prev, option];
      }
    });
  }

  async function handleSubmit() {
    if (selectedOptions.length == 0) {
      toast.error("Please select an option.");
      return;
    }
    if (hitSubmit) {
      toast.error("Can only submit this once, please be patient");
      return;
    }
    setHitSubmit(true);

    let option_ids = [];
    for (let option of selectedOptions) {
      option_ids.push(option.id);
    }

    try {
      const loadingToast = toast.loading("Submitting votes...");

      const user_id = user?.auth_id!;
      const response = await submitOptionVotes(hangout_id, user_id, option_ids);

      toast.dismiss(loadingToast);

      if (response.status == 200) {
        toast.success(response.message || "Votes submitted successfully!");

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
      console.error("Error submitting votes:", error);
    }
  }

  const CardOptions = options.map((option, index) => {
    return (
      <div key={index} className="py-2">
        <div className="flex items-center gap-3">
          <button onClick={() => handleSelectOption(option)}>
            {selectedOptions.includes(option) ? (
              <CircleCheck
                size={40}
                className="bg-black stroke-white rounded-full"
              />
            ) : (
              <CircleCheck size={40} />
            )}
          </button>
          <Option option={option.option} />
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col pt-10 min-h-screen text-black w-full px-10">
      <div className="flex justify-between mb-6 pb-2">
        <div className="font-semibold text-4xl">{title}</div>
        <button
          className="bg-darkBlue hover:bg-darkBlue/80 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
          onClick={handleSubmit}
        >
          {hitSubmit ? "Submitting..." : "Submit Votes"}
        </button>
      </div>
      <div className="relative border-gray-400 border p-4 shadow-md rounded-lg">
        <InfoModal
          information={informationStrings.availabilityVoting}
          size={36}
        />
        <div className="font-semibold text-2xl pb-3">Select Meetup Options</div>
        <div>{CardOptions}</div>
      </div>
    </div>
  );
}
