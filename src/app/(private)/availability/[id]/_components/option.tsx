type Props = {
    option: string
}

export default function Option({option}: Props) {
    const [day, startTime, endTime] = option.split(',');

    return (
        <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="font-medium text-gray-800 mb-1 sm:mb-0">{day}</div>
                <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{startTime} - {endTime}</span>
                </div>
            </div>
        </div>
    )
}