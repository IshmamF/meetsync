import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import MapBox from './mapbox'; 
import { useEffect, useState } from "react";
import { GetPlaceCoord } from "../actions";
  
interface Props {
    locationName: string;
    title: string;
    scheduled_time: string;
}

type PlaceCoordResponse = {
    status: number,
    data: Location[],
}

type Location = {
    location: Coordinate
}

type Coordinate = {
    latitude: number,
    longitude: number,
}

export default function MeetupInfo({locationName, title, scheduled_time} : Props) {
    const [coord, setCoord] = useState<number[]>([]);

    useEffect(()=>{
        async function GetMeetupData() {
            const response: PlaceCoordResponse = await GetPlaceCoord(locationName);
            console.log(response);
            if (response.status == 200) {
                setCoord([response.data[0].location.latitude, response.data[0].location.longitude]);
            }
        }

        GetMeetupData();
    }, [])
    
    return (
        <Dialog>
            <DialogTrigger>Info</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{`${title} : ${scheduled_time}`}</DialogTitle>
                    {coord.length > 0 ? <MapBox locationName={locationName} coord={coord}/> : "Getting meetup information"}
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}