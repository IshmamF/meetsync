import Hangouts from './_components/Hangouts';
import ConfirmTimePopUp from './_components/confirmTime';

export default function Page() {
    return (
        <div>
            <ConfirmTimePopUp></ConfirmTimePopUp>
            <Hangouts />
        </div>
    );
}