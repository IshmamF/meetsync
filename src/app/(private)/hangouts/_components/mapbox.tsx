'use client';
import Map, { Marker, Popup, MapRef }  from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, Suspense } from 'react';
import {useRef} from 'react';

const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

interface Props {
  locationName: string;
  coord: number[];
  userloc: number[];
  address: string;
  viewState:  {
    longitude: number,
    latitude:  number,
    zoom: number
  };
  setViewState: React.Dispatch<React.SetStateAction<{
    longitude: number;
    latitude: number;
    zoom: number;}>>;
}

const MapBox = ({locationName, coord, address, userloc, viewState, setViewState}: Props) => {
  const mapRef = useRef<MapRef | null>(null);
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <Suspense>
        <Map
          {...viewState}
          ref={mapRef}
          mapboxAccessToken={token}
          style={{ width: '400px', height: '400px' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          onMove={(evt) => {setViewState(evt.viewState)}}
        >
          <Marker
            longitude={userloc[0]}
            latitude={userloc[1]}
            anchor="bottom"
          >
          </Marker>

          <Marker
            longitude={coord[0]!}
            latitude={coord[1]!}
            anchor="bottom"
            color='red'
            onClick={e => {
              e.originalEvent.stopPropagation();
              setOpenPopup(true);
            }}
          >
          </Marker>
          {openPopup &&
            <Popup
              anchor="bottom"
              longitude={Number(coord[0])}
              latitude={Number(coord[1]!)}
              onClose={() => setOpenPopup(false)}
            >
              <div className="flex flex-col items-start space-y-1">
                <h3 className="text-sm font-semibold text-black">
                  {locationName}
                </h3>
                <p className="text-xs text-gray-500">
                  {address}
                </p>
                <button
                  onClick={() => setOpenPopup(false)}
                  className="self-end text-xs text-blue-500 hover:underline "
                >
                  Close
                </button>
              </div>
            </Popup>}

            <div className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 p-2 rounded-md flex space-x-2">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="view"
                  defaultChecked={true}
                  onChange={() => mapRef.current?.flyTo({ center: [userloc[0], userloc[1]], duration: 2000 })}
                />
                <span>Current</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="view"
                  onChange={() => mapRef.current?.flyTo({ center: [coord[0], coord[1]], duration: 2000 })}
                />
                <span>Destination</span>
              </label>
            </div>


        </Map>
      </Suspense>
    </>
  );
};

export default MapBox;
