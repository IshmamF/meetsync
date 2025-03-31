'use client'

import {useState, useEffect} from 'react'
import QuickSelect from './quickSelect';
import SelectDay from './selectDays';
import SelectTimes from './selectTimes';

type Props = {
    setOptions: React.Dispatch<React.SetStateAction<string[]>>;
    options: string[]
}

export default function AvailabilityOptions({setOptions, options}: Props) {

    const [selectedDay, setSelectedDay] = useState<string>('');
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [quickSelect, setQuickSelect] = useState<string>("");

    console.log('this is a test for github webhook')

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
                    final_start_time = '9 AM';
                    final_end_time = '12 PM';
                    break;
                case 'Afternoon (12 PM - 5 PM)':
                    final_start_time = '12 PM';
                    final_end_time = '5 PM';
                    break;
                case 'Evening (5 PM - 9 PM)':
                    final_start_time = '5 PM';
                    final_end_time = '9 PM';
                    break;
            };
        } else if (startTime && endTime) {
            final_start_time = startTime;
            final_end_time = endTime;    
        } else {
            return;
        }
        if (!selectedDay) return;
        const final_option = `${selectedDay},${final_start_time},${final_end_time}`;

        if (!options.includes(final_option)) {
            setOptions((prev: string[]) => [...prev, final_option]);
        }
    }

    return (
        <div className="text-black w-full">
            <form onSubmit={handleSubmit} className='bg-white w-full pb-6 flex flex-col rounded-lg'>
                <div className="flex flex-col sm:flex-row">
                    <div className="px-8 flex-1 sm:border-r sm:pr-8">
                        <SelectDay
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                        />
                    </div>
                    <div className="flex-1 px-8 pt-6 sm:pt-0">
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
                            ${( !(quickSelect || (startTime && endTime)) || (selectedDay == ''))
                                ? 'bg-darkBlue/45 cursor-not-allowed' 
                                : 'bg-darkBlue hover:bg-darkBlue/80 focus:outline-none focus:ring-2 focus:ring-darkBlue focus:ring-opacity-50'
                            } 
                            w-auto mx-auto`}
                    disabled={( !(quickSelect || (startTime && endTime)) || (selectedDay == ''))}
                >
                    Confirm Availability
                </button>
            </form>
        </div>
    );
}