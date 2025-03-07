
const options = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
import clsx from 'clsx';

interface Props {
    setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>
    selectedDays: string[]
}

export default function SelectDays({selectedDays, setSelectedDays}: Props) {

    const handleClick = (day: string) => {
        setSelectedDays((prevSelectedDays) => {
            if (prevSelectedDays.includes(day)) {
                return prevSelectedDays.filter(d => d !== day);
            } else {
                return [...prevSelectedDays, day];
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
                            selectedDays.includes(day)
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