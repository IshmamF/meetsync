import Hangouts from './_components/Hangouts';
import ConfirmTimePopUp from './_components/confirmTime';

export default function Page() {
    return (
        <div>
            <ConfirmTimePopUp
                time={"05/20/2025 12:00:00"}
                hangout_id={11}
            />
            <Hangouts />
        </div>
    );
}