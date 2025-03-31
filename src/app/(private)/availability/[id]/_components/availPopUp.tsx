import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import AvailabilityOptions from "./availabilityOptions"
  
type Props = {
    setOptions: React.Dispatch<React.SetStateAction<string[]>>;
    options: string[]
}

export default function AvailabilityModal({setOptions, options}: Props) {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-lg shadow-md transition-colors duration-200">
                    Add Availability
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-extrabold text-3xl text-darkBlue pb-4">Submit Availability</DialogTitle>
                </DialogHeader>
                <AvailabilityOptions
                    setOptions={setOptions}
                    options={options}
                />
            </DialogContent>
        </Dialog>
    )
}