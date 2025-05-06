'use client';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, Suspense } from 'react';
import MarkerDialog from './markerDialog';

const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

type info = {
  title: string;
  latitude: number | null;
  longitude: number | null;
};

interface Props {
  locationName: string;
  coord: number[];
}


const MapBox = ({locationName, coord}: Props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [userloc, setUserLoc] = useState<[number, number]>([ -73.8203, 40.7367 ]);
  const [viewState, setViewState] = useState({
    longitude: userloc[0],
    latitude: userloc[1],
    zoom: 13
  });
  
  let currInfo : info = {
    title: locationName, 
    latitude: coord[0],
    longitude: coord[1],
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true
    });

    function successLocation(position: GeolocationPosition) {
      const newLoc: [number, number] = [position.coords.longitude, position.coords.latitude];
      console.log('User location found:', newLoc);
      setUserLoc(newLoc);
    }

    function errorLocation() {
      console.log('Error getting location, using default.');
      setUserLoc([73.8203, 40.7367]);
    }
  }, []);

  useEffect(() => {
    setViewState((prev) => ({
      ...prev,
      longitude: userloc[0],
      latitude: userloc[1]
    }));
  }, [userloc]);

  return (
    <>
      <Suspense>
        <Map
          {...viewState}
          mapboxAccessToken={token}
          style={{ width: '400px', height: '400px' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          onMove={(evt) => {setViewState(evt.viewState)}}
        >
          <Marker
            longitude={coord[1]!}
            latitude={coord[0]!}
            anchor="bottom"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
          </Marker>
        </Map>
      </Suspense>

      {currInfo && (
        <MarkerDialog issue={currInfo} openDialog={openDialog} setOpenDialog={setOpenDialog} />
      )}
    </>
  );
};

export default MapBox;
