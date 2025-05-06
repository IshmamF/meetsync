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
    location: Coordinate,
    address: string,
}

type Coordinate = {
    latitude: number,
    longitude: number,
}

export default function MeetupInfo({locationName, title, scheduled_time} : Props) {
    const [coord, setCoord] = useState<number[]>([]);
    const [address, setAddress] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const DEFAULT_LOC = [ -73.8203, 40.7367 ];
    const [userloc, setUserLoc] = useState<number[]>(DEFAULT_LOC);
    const [viewState, setViewState] = useState({
        longitude: DEFAULT_LOC[0],
        latitude:  DEFAULT_LOC[1],
        zoom: 14
    });

    useEffect(()=>{
        async function GetMeetupData() {
            const response: PlaceCoordResponse = await GetPlaceCoord(locationName);
            console.log(response);
            if (response.status == 200) {
                const { latitude, longitude } = response.data[0].location;
                setCoord([longitude, latitude]);
                setAddress(response.data[0].address);
            }
        }

        GetMeetupData();
    }, [])

    useEffect(() => {
        if (!isOpen) return;
        function SuccessGetPosition(pos: GeolocationPosition) {
          const newLoc: [number, number] = [pos.coords.longitude, pos.coords.latitude];
          console.log('User location found:', newLoc);
          setUserLoc(newLoc);
          setViewState(v => ({
            ...v,
            longitude: newLoc[0],
            latitude:  newLoc[1]
          }));
        }
  
        function ErrorGetPosition(err: GeolocationPositionError) {
          if (userloc == DEFAULT_LOC) {
            console.warn('Error getting location, falling back to default.', err);
            setUserLoc(DEFAULT_LOC);
            setViewState(v => ({
              ...v,
              longitude: DEFAULT_LOC[0],
              latitude:  DEFAULT_LOC[1]
            }));
          }
        }
        navigator.geolocation.getCurrentPosition(SuccessGetPosition, ErrorGetPosition, { enableHighAccuracy: true });
      }, [isOpen]);

    useEffect(() => {
        setViewState((prev) => ({
        ...prev,
        longitude: userloc[0],
        latitude: userloc[1]
        }));
    }, [userloc]);
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 hover:text-white">Info</DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex items-center text-xl font-semibold ">
                    <DialogTitle>{`${title} : ${scheduled_time}`}</DialogTitle>
                </DialogHeader>
                <div className="h-full flex justify-center">
                    {coord.length > 0 ? (
                        <MapBox
                            locationName={locationName}
                            coord={coord}
                            address={address}
                            userloc={userloc}
                            viewState={viewState}
                            setViewState={setViewState}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            No meetup information retrieved...
                        </div>
                    )}
                </div>

            </DialogContent>
        </Dialog>

    )
}