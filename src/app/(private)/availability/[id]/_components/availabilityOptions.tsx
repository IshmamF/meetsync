'use client';

import {useState, useEffect} from 'react';
import QuickSelect from './quickSelect';
import SelectDay from './selectDay';
import SelectTimes from './selectTimes';

type Props = {
    setOptions: React.Dispatch<React.SetStateAction<string[]>>;
    options: string[]
}

export default function AvailabilityOptions({setOptions, options}: Props) {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [quickSelect, setQuickSelect] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(new Date());

    useEffect(() => {

        function ChangeToQuickSelect() {
            setStartTime('');
            setEndTime('');
        }

        ChangeToQuickSelect();

    }, [quickSelect]);

    useEffect(() => {

        function ChangeToTimeRange() {
            if (!(startTime == '' && endTime == '')) {
                setQuickSelect('');
            }
        }

        ChangeToTimeRange();

    }, [startTime, endTime]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let final_start_time = '';
        let final_end_time = '';
        if (quickSelect) {
            switch (quickSelect) {
                case 'Morning (9 AM - 12 PM)':
                    final_start_time = '09:00';
                    final_end_time = '12:00';
                    break;
                case 'Afternoon (12 PM - 5 PM)':
                    final_start_time = '12:00';
                    final_end_time = '17:00';
                    break;
                case 'Evening (5 PM - 9 PM)':
                    final_start_time = '17:00';
                    final_end_time = '21:00';
                    break;
            };
        } else if (startTime && endTime) {
            final_start_time = startTime;
            final_end_time = endTime;    
        } else {
            return;
        }
        if (!date) return;

        const formattedDate = date?.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });

        const final_option = `${formattedDate},${final_start_time},${final_end_time}`;

        if (!options.includes(final_option)) {
            setOptions((prev: string[]) => [...prev, final_option]);
        }
    }

    return (
        <div className="text-black w-full">
            <form onSubmit={handleSubmit} className='bg-white w-full pb-6 flex flex-col rounded-lg'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 md:border-r md:pr-8">
                        <SelectDay date={date} setDate={setDate} />
                    </div>
                    <div className="p-4 flex flex-col space-y-4">
                        <div>
                            <SelectTimes 
                                startTime={startTime}
                                endTime={endTime}
                                setStartTime={setStartTime}
                                setEndTime={setEndTime}
                            />
                        </div>
                        <div className="pt-6">
                            <QuickSelect
                                quickSelect={quickSelect}
                                setQuickSelect={setQuickSelect}
                            />                         
                        </div>
                    </div>
                </div>
                <button 
                        className={`mt-8 py-3 px-8 rounded-2xl text-white font-semibold shadow-md 
                            ${( !(quickSelect || (startTime && endTime)) || (!date))
                                ? 'bg-darkBlue/45 cursor-not-allowed' 
                                : 'bg-darkBlue hover:bg-darkBlue/80 focus:outline-none focus:ring-2 focus:ring-darkBlue focus:ring-opacity-50'
                            } 
                            w-auto mx-auto`}
                    disabled={( !(quickSelect || (startTime && endTime)) || (!date))}
                >
                    Add Availability
                </button>
            </form>
        </div>
    );
}