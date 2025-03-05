export default function AvailabilityPage() {
    return (
        <div className="pt-8 bg-lightBlue min-h-screen text-black w-full px-6">
            <h1 className="font-extrabold text-3xl text-darkBlue pb-4">Submit Your Availability</h1>
            <div className='bg-white w-full pb-6 pt-4 flex flex-col shadow-md rounded-lg'>
                <div className="grid grid-cols-2">
                    <div className="pl-5 ">
                        <h2 className="font-bold text-2xl text-darkBlue pb-2">Select Days</h2>
                        <div>
                            multiple choice option for days of the week
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <h2 className="font-bold text-2xl text-darkBlue pb-2">Select Times</h2>
                            <div>
                                start and end time inputs
                            </div>
                        </div>
                        <div className="pt-6">
                            <h2 className="font-bold text-xl text-darkBlue/70 pb-2">Quick Select</h2>
                            <div>
                                single choice option for time range    
                            </div>                        
                        </div>
                    </div>
                </div>
                <button className="mt-8 py-3 px-8 rounded-2xl bg-darkBlue text-white font-semibold shadow-md hover:bg-darkBlue/80 focus:outline-none focus:ring-2 focus:ring-darkBlue focus:ring-opacity-50 w-auto mx-auto">
                    Confirm Availability
                </button>
            </div>
        </div>
    );
}