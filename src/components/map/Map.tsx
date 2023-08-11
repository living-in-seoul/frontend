'use client';
import {
  GoogleMap,
  Libraries,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import PlacesAutoComplete from './PlacesAutoComplete';
import useSWR from 'swr';
import useMapInstance from '@/hooks/useMapInstance';
import useNearbySearch from '@/hooks/useNearbySearch';
import { useRouter } from 'next/navigation';
import MapBottomSheet from './MapBottomSheet';

const googleMapsLibraries: Libraries = ['places'];

const containerStyle = {
  width: '100%',
  height: '100vh',
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

const MapLoad = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
    libraries: googleMapsLibraries,
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return <Map />;
};

const Map = () => {
  const router = useRouter();
  const { map, onLoad, onUnmount } = useMapInstance();
  const [placeId, setPlaceId] = useState<string | null>(null);
  const [types, setTypes] = useState<string[]>(['restaurants']);
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
    types,
  });
  const ZOOM = 17;

  useEffect(() => {
    if (map && locationDetail) {
      map.panTo(locationDetail.result.geometry.location);
      setCenter(locationDetail.result.geometry.location);
    }
  }, [locationDetail, map]);

  const onSelectPlace = useCallback((placeId: string) => {
    setPlaceId(placeId);
  }, []);

  const onMarkerClick = (
    e: google.maps.MapMouseEvent,
    placeId: string | undefined,
  ) => {
    router.push(`/place/${placeId}/2`);
  };

  return (
    <section className="w-full h-full bg-slate-400 absolute pb-24">
      <PlacesAutoComplete onSelectPlace={onSelectPlace} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        // onClick={(e) => e.stop()}
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
                clickable
                position={place.geometry.location}
                onClick={(e) => onMarkerClick(e, place.place_id)}
              />
            );
        })}
      </GoogleMap>
    </section>
  );
};

export default MapLoad;
