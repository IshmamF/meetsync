const options = ['Morning (9 AM - 12 PM)', 'Afternoon (12 PM - 5 PM)', 'Evening (5 PM - 9 PM)'];

interface Props {
    setQuickSelect: React.Dispatch<React.SetStateAction<string>>
    quickSelect: string
}

export default function QuickSelect({quickSelect, setQuickSelect }: Props) {
    const handleClick = (value: string) => {
        if (quickSelect === value) {
            setQuickSelect(""); 
        } else {
            setQuickSelect(value); 
        }
    };

    return (
        <div>
            <h2 className="font-bold text-xl text-darkBlue/70 pb-2">Quick Select</h2>
            <div className="space-y-2">
                {options.map(range => (
                    <div
                        key={range}
                        onClick={() => handleClick(range)}
                        className={`cursor-pointer p-4 border-2 rounded-lg text-center transition-all duration-300 ${
                            quickSelect === range ? "bg-darkBlue text-white" : "bg-white text-darkBlue"
                        }`}
                    >
                        {range}
                    </div>
                ))}
            </div>
        </div>
    );
};