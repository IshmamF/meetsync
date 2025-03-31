import { useState } from "react";
import Option from "./option";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
    options: MeetupOption[]
    title: string
}

type MeetupOption = {
    id: string,
    option: string
}

export default function VoterPage({options, title} : Props) {
    const [selectedOptions, setSelectedOptions] = useState<MeetupOption[]>([]);
    const [hitSubmit, setHitSubmet] = useState<boolean>(false);
    const router = useRouter();

    function handleSelectOption(option: MeetupOption) {
        setSelectedOptions((prev) => {
            if (selectedOptions.includes(option)) {
                return selectedOptions.filter((prevOption) => option != prevOption);
            } else {
                return [...prev, option];
            }
        })
    }

    function handleSubmit() {
        if (selectedOptions.length == 0) {
            toast.error('Please select an option.');
            return;
        }
        if (hitSubmit) {
            toast.error('Can only submit this once, please be patient');
            return;
        }
        setHitSubmet(true);
        
    }

    const CardOptions = options.map((option, index) => {
        return (
            <div key={index} className="py-2">
                <div className="flex items-center gap-3">
                    <button onClick={() => handleSelectOption(option)}>
                        {(selectedOptions.includes(option)) ?
                            (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>)
                            :
                            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>)
                        }
                    </button>
                    <Option 
                        option={option.option}
                    />
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
                    {hitSubmit ? "Submitting..." : "Submit Availability"}
                </button>
            </div>
            <div className="border-gray-400 border p-4 shadow-md rounded-lg">
                <div className="font-semibold text-2xl pb-3">Select Meetup Options</div>
                <div>{CardOptions}</div>
            </div>
        </div>
    )
}