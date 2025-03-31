import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Availability from "./availability"
  

export default function AvailabilityModal() {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <button className="bg-yellow-500 text-black rounded-lg shadow-md px-1 py-3 sm:px-2 sm:py-3">
                    Add Availability
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-extrabold text-3xl text-darkBlue pb-4">Submit Availability</DialogTitle>
                </DialogHeader>
                <Availability/>
            </DialogContent>
        </Dialog>
    )
}