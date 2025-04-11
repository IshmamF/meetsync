import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import TimeAddressForm from "./timeAddressForm"

export default function ConfirmTimePopUp() {
    

    return (
        <>
            <div className="flex gap-3 ">
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="bg-green-500 hover:bg-green-600 text-black font-medium px-4 py-2 rounded-lg shadow-md transition-colors duration-200">
                            Confirm
                        </button>
                    </DialogTrigger>
                    <DialogContent className="bg-lightBlue">
                        <DialogHeader>
                            <DialogTitle className="font-extrabold text-3xl text-darkBlue pb-4">Confirm Time and Place</DialogTitle>
                        </DialogHeader>
                        <TimeAddressForm/>
                    </DialogContent>
                </Dialog>
                <button className="bg-red-500 hover:bg-red-600 text-black font-medium px-4 py-2 rounded-lg shadow-md transition-colors duration-200">
                    Decline
                </button>
            </div>
        </>
    )
}