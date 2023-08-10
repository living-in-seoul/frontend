'use client';
import {
  GoogleMap,
  LoadScriptNext,
  LoadScriptProps,
  MarkerF,
} from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import PlacesAutoComplete from './PlacesAutoComplete';
import useSWR from 'swr';
import MapBottomSheet from './MapBottomSheet';
import useMapInstance from '@/hooks/useMapInstance';
import useNearbySearch from '@/hooks/useNearbySearch';

const googleMapsLibraries: LoadScriptProps['libraries'] = ['places'];
const containerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions = {
  disableDefaultUI: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

const Map = () => {
  const { map, onLoad, onUnmount } = useMapInstance();
  const [placeId, setPlaceId] = useState<string | null>(null);
  const [center, setCenter] = useState<LatLng>({
    lat: 37.5665,
    lng: 126.978,
  });
  const { data: locationDetail } = useSWR<PlaceByPlaceIdResponse>(
    placeId ? `api/map/places/${placeId}` : null,
    null,
    {
      focusThrottleInterval: 5000,
    },
  );
  const { places } = useNearbySearch({
    map,
    center,
    radius: 800,
    types: ['restaurants'],
  });
  //constants 파일?
  const ZOOM = 17;

  useEffect(() => {
    if (map && locationDetail) {
      map.panTo(locationDetail.result.geometry.location);
      //nearby places 때문에 바꿔줘야함....
      setCenter(locationDetail.result.geometry.location);
    }
  }, [locationDetail]);

  const onSelectPlace = useCallback((placeId: string) => {
    setPlaceId(placeId);
  }, []);

  //로딩 처리 필요
  return (
    <section className="w-full h-full bg-slate-400 absolute pb-24">
      <PlacesAutoComplete onSelectPlace={onSelectPlace} />
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}
        preventGoogleFontsLoading={true}
        libraries={googleMapsLibraries}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={ZOOM}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {places.map((place) => {
            if (place.geometry?.location)
              return (
                <MarkerF
                  key={place.place_id}
                  position={place.geometry.location}
                />
              );
          })}
        </GoogleMap>
      </LoadScriptNext>
      <MapBottomSheet places={places} />
    </section>
  );
};

export default Map;
