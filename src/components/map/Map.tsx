'use client';
import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import PlacesAutoComplete from './PlacesAutoComplete';
import useSWR from 'swr';
import MapBottomSheet from './MapBottomSheet';

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
  const [map, setMap] = useState(null);
  const [placeId, setPlaceId] = useState<string | null>(null);
  const [center, setCenter] = useState<LatLng>({
    lat: 37.5665,
    lng: 126.978,
  });
  const { data: locationDetail, isLoading } = useSWR<PlaceByPlaceIdResponse>(
    placeId ? `api/map/places/${placeId}` : null,
    null,
    {
      focusThrottleInterval: 5000,
    },
  );
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const ZOOM = 17;

  useEffect(() => {
    if (locationDetail?.result) {
      setCenter(locationDetail.result.geometry.location);
    }
  }, [locationDetail, placeId]);

  // custom hook
  useEffect(() => {
    if (map) {
      const service = new window.google.maps.places.PlacesService(map);
      const request: RequestPlaces = {
        location: center,
        radius: 800,
        types: ['restaurant', 'laundry', 'police'],
      };
      service.nearbySearch(request, (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          setPlaces(results);
        }
      });
    }
  }, [map, center]);

  const onLoad = useCallback(function callback(map: any) {
    console.log('맵 새로 가져옴!');
    map.setZoom(ZOOM);
    setMap(map);
  }, []);

  //map, setMap이랑 커스텀 훅
  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

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
        libraries={['places']}
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
