'use client'

import { useState, useEffect, useRef } from "react"
import { useUser } from "@/utils/context/userContext"
import { AddressAutofill } from "@mapbox/search-js-react";
import { AddressAutofillRetrieveResponse } from "@mapbox/search-js-core/dist/autofill/AddressAutofillCore";


export default function TimeAddressForm() {
    const user = useUser(); 
    const [address, setAddress] = useState<string>("");
    const [transport, setTransport] = useState<string>("");

    useEffect(() => {
        if (user?.home_address) {
            setAddress(user.home_address);
        }
        if (user?.default_transport) {
            setTransport(user?.default_transport);
        }
    }, [user?.home_address, user?.default_transport]);

    const [travelTime, setTravelTime] = useState<number>(0);

    const handleAddress = (res: AddressAutofillRetrieveResponse) => {
        console.log(res);
        const newAddress = res.features[0].properties.place_name || "Unknown address";
        console.log(newAddress);
        // we have to wait just a small amount for maxbox to input the half address
        // so then we can replace it with the full. I couldn't find another way around that
        setTimeout(() => {
            console.log(newAddress);
            setAddress(newAddress);
        }, 1);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }
  

    return (
        <form 
            className="flex flex-col bg-lightBlue"
            onSubmit={handleSubmit}
            autoComplete="off"
        >
            <label className="text-2xl font-bold mb-2" htmlFor="address">
                Address
            </label>
            {/* @ts-ignore */}
            <AddressAutofill
                onRetrieve={handleAddress}
                accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
            >

                <input
                    className="border-2 border-jetBlack p-2 pl-4 rounded-lg mb-5 w-full"
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter your address"
                    autoComplete="address-line1"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </AddressAutofill>

            <div className="flex flex-col ">
                <label className='text-2xl font-bold mb-2' htmlFor="travelTime">
                    Travel Time (minutes)
                </label>
                <input
                    className="border-2 border-jetBlack p-2 rounded-lg mb-5"
                    type="number"
                    id="travelTime"
                    name="travelTime"
                    value={travelTime}
                    onChange={(e) => setTravelTime(parseInt(e.target.value))}
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="text-2xl font-bold mb-2" htmlFor="transport">
                    Transport
                </label>
                <select
                    id="transport"
                    value={transport}
                    name="transport"
                    onChange={(e) => setTransport(e.target.value)}
                    required
                    className="border-2 border-jetBlack p-2 pl-4 rounded-lg mb-5"
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option value="driving+public_transport">Driving</option>
                    <option value="public_transport">Transit</option>
                    <option value="walking+ferry">Walking</option>
                    <option value="cycling+ferry">Cycling</option>
                </select>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-black font-medium px-4 py-2 rounded-lg shadow-md transition-colors duration-200">
                Confirm
            </button>
        </form>
    )
}