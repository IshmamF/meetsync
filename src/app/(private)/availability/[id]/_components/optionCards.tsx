import Option from "./option";

type Props = {
    setOptions: React.Dispatch<React.SetStateAction<string[]>>;
    options: string[]
}

export default function OptionCards({setOptions, options}: Props) {

    function handleDelete(option: string) {
        setOptions(options.filter((curr) => (curr != option)))
    }

    const CardOptions = options.map((option, index) => {
        
        return (
            <div key={index} className="py-2">
                <div className="flex items-center gap-3">
                    <Option 
                        option={option}
                    />
                    <button 
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-md shadow-md"
                        onClick={() => handleDelete(option)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    });
    return (
        <div className="border-gray-400 border p-4 shadow-md rounded-lg">
            <div className="font-semibold text-2xl pb-3">Selected Availability</div>
            {(options.length != 0) ? (<div>{CardOptions}</div>) : (<div>None added yet</div>)}
        </div>
    )
}