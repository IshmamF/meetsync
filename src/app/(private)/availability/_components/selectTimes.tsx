interface Props {
    setStartTime: React.Dispatch<React.SetStateAction<string>>
    setEndTime: React.Dispatch<React.SetStateAction<string>>
    endTime: string
    startTime: string
}


export default function SelectTimes({setEndTime, setStartTime, endTime, startTime}: Props) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if (name == 'start-time') {
            setStartTime(value);
        } else {
            setEndTime(value);
        }
    }

    return (
        <div>
            <h2 className="font-bold text-2xl text-darkBlue pb-2">Select Times</h2>
            <div className="space-y-3">
                <div className="">
                    <label htmlFor="start-time" className="text-lg">Start Time</label>
                    <input
                        id="start-time"
                        name="start-time"
                        type="time"
                        value={startTime}
                        className="border border-gray-300 rounded-md p-2 block"
                        onChange={handleChange}
                        required
                    >
                    </input>
                </div>
                <div >
                    <label htmlFor="end-time" className="text-lg">End Time</label>
                    <input
                        id="end-time"
                        name="end-time"
                        type="time"
                        value={endTime}
                        className="border border-gray-300 rounded-md p-2 block"
                        onChange={handleChange}
                        required
                    >
                    </input>
                </div>
            </div>
        </div>
    )
}