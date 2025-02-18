import Weekly from './_components/weekly';
import Monthly from './_components/monthly';
import Older from './_components/older';

export default function Notification() {

    return (
        <div className="flex flex-col pt-10 items-center bg-lightBlue min-h-screen text-black">
            <div className="font-semibold text-5xl">Notifications</div>
            <div className="flex flex-col">
                <Weekly/>
                <Monthly/>
                <Older/>
            </div>
        </div>
    )
}