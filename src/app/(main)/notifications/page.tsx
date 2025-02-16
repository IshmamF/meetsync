import Weekly from './_components/weekly';
import Monthly from './_components/monthly';
import Other from './_components/other';

export default function Notification() {

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="font-semibold text-5xl">Notifications</div>
            <div className="flex flex-col items-center">
                <Weekly/>
                <Monthly/>
                <Other/>
            </div>
        </div>
    )
}