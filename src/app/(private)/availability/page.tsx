'use client'

import {useState, useEffect} from 'react'
import QuickSelect from './_components/quickSelect';
import SelectDays from './_components/selectDays';
import SelectTimes from './_components/selectTimes';

export default function AvailabilityPage() {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [quickSelect, setQuickSelect] = useState("");

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
        /* To Do 
        - send information to backend
        - fix schema for availability
        */

    }
    return (
        <div className="pt-8 bg-lightBlue min-h-screen text-black w-full px-6">
            <h1 className="font-extrabold text-3xl text-darkBlue pb-4">Submit Your Availability</h1>
            <form onSubmit={handleSubmit} className='bg-white w-full pb-6 pt-4 flex flex-col shadow-md rounded-lg'>
                <div className="flex flex-col sm:flex-row">
                    <div className="px-8 flex-1 sm:border-r sm:pr-8">
                        <SelectDays
                            selectedDays={selectedDays}
                            setSelectedDays={setSelectedDays}
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
                            ${( !(quickSelect || (startTime && endTime)) || (selectedDays.length == 0))
                                ? 'bg-darkBlue/45 cursor-not-allowed' 
                                : 'bg-darkBlue hover:bg-darkBlue/80 focus:outline-none focus:ring-2 focus:ring-darkBlue focus:ring-opacity-50'
                            } 
                            w-auto mx-auto`}
                    disabled={( !(quickSelect || (startTime && endTime)) || (selectedDays.length == 0))}
                >
                    Confirm Availability
                </button>
            </form>
        </div>
    );
}