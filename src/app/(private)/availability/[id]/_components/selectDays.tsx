
const options = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
import clsx from 'clsx';

interface Props {
    setSelectedDay: React.Dispatch<React.SetStateAction<string>>
    selectedDay: string
}

export default function SelectDay({selectedDay, setSelectedDay}: Props) {

    const handleClick = (day: string) => {
        setSelectedDay((prevSelectedDays) => {
            if (prevSelectedDays == day) {
                return '';
            } else {
                return day;
            }
        });    
    };

    return (
        <div>
            <h2 className="font-bold text-2xl text-darkBlue pb-2">Select Days</h2>
            <div className="grid grid-cols-1 gap-4">
                {options.map((day) => (
                    <div
                        key={day}
                        onClick={() => handleClick(day)}
                        className={clsx(
                            "cursor-pointer p-4 border-2 rounded-md text-center transition-all duration-300",
                            selectedDay == day
                            ? "bg-darkBlue text-white border-darkBlue"
                            : "bg-white text-darkBlue border-gray-200"
                        )}
                    >
                        {day}
                    </div>

                ))}
            </div>
        </div>
    )

}