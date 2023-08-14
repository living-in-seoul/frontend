'use client';
import {
  GoogleMap,
  Libraries,
  LoadScriptNext,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import { placeIdState, placesState } from '@/recoil/states';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useMapInstance from '@/hooks/useMapInstance';
import useNearbySearch from '@/hooks/useNearbySearch';
import { useRouter } from 'next/navigation';
import {
  MapStyleVersionOne,
  MapStyleVersionThree,
  MapStyleVersionTwo,
} from '@/utils/styles';

const libraries: Libraries = ['places'];

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const Map = () => {
  const router = useRouter();
  const [placeId, setPlaceIdState] = useRecoilState(placeIdState);
  const { map, onLoad, onUnmount } = useMapInstance();
  const [types, setTypes] = useState<string[]>(['restaurants']);
  const [center, setCenter] = useState<LatLng>({
    lat: 37.5665,
    lng: 126.978,
  });
  const setPlacesState = useSetRecoilState(placesState);

  // const { data: locationDetail } = useSWR<PlaceByPlaceIdResponse>(
  //   placeId ? `api/map/places/${placeId}` : null,
  //   null,
  //   {
  //     focusThrottleInterval: 5000,
  //   },
  // );

  const mapOptions: google.maps.MapOptions = {
    fullscreenControl: true,
    gestureHandling: 'greedy',
    disableDoubleClickZoom: true,
    // restriction: {
    //   latLngBounds: seoulBound,
    //   strictBounds: true,
    // },
    disableDefaultUI: true,
    styles: MapStyleVersionThree,
  };
  const { places } = useNearbySearch({
    map,
    center,
    radius: 800,
    types,
  });
  const ZOOM = 17;

  // useEffect(() => {
  //   if (map && locationDetail) {
  //     map.panTo(locationDetail.result.geometry.location);
  //     setCenter(locationDetail.result.geometry.location);
  //   }
  // }, [locationDetail, map]);

  // useEffect(() => {
  //   setPlacesState(places);
  // }, [places, setPlacesState]);

  const onMarkerClick = (
    e: google.maps.MapMouseEvent,
    placeId: string | undefined,
  ) => {
    placeId && setPlaceIdState(placeId);
    router.push(`/place/${placeId}/2`);
  };

  return (
    <section className="w-full h-full bg-slate-400">
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}
        loadingElement={<div>Loading...</div>}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={ZOOM}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {/* {places.map((place) => {
            if (place.geometry?.location && place.icon) {
            const customIcon: google.maps.Icon = {
              url: place.icon,
              scaledSize: new google.maps.Size(20, 20),
            };
              return (
                <MarkerF
                  key={place.place_id}
                  icon={customIcon}
                clickable
                  position={place.geometry.location}
                  onClick={(e) => onMarkerClick(e, place.place_id)}
                />
              );
            }
        })} */}
        </GoogleMap>
      </LoadScriptNext>
    </section>
  );
};

export default Map;
