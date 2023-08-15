'use client';
import {
  GoogleMap,
  LoadScriptNext,
  MarkerF,
  HeatmapLayerF,
} from '@react-google-maps/api';
import {
  filterState,
  placeIdState,
  placesState,
  rangeState,
} from '@/recoil/mapStates';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
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
import { googleMapsLibraries } from '@/utils/constants';

const containerStyle = {
  width: '100%',
  height: '100vh',
};
const Map = () => {
  const router = useRouter();
  const [placeId, setPlaceIdState] = useRecoilState(placeIdState);
  const filterValue = useRecoilValue(filterState);
  const rangeValue = useRecoilValue(rangeState);
  const [zoom, setZoom] = useState<number>(18);
  const { map, onLoad, onUnmount } = useMapInstance();
  const [center, setCenter] = useState<LatLng>({
    lat: 37.5665,
    lng: 126.978,
  });
  const setPlacesState = useSetRecoilState(placesState);

  // const seoulBound = new google.maps.LatLngBounds(
  //   new google.maps.LatLng(37.426, 126.764), // 남서쪽 좌표
  //   new google.maps.LatLng(37.701, 127.183), // 북동쪽 좌표
  // );

  const mapOptions: google.maps.MapOptions = {
    fullscreenControl: true,
    gestureHandling: 'greedy',
    disableDoubleClickZoom: true,
    disableDefaultUI: true,
    styles: MapStyleVersionTwo,
  };
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
    radius: rangeValue,
    type: filterValue,
  });

  // useEffect(() => {
  //   if (map && locationDetail) {
  //     map.panTo(locationDetail.result.geometry.location);
  //     setCenter(locationDetail.result.geometry.location);
  //   }
  // }, [locationDetail, map]);

  useEffect(() => {
    setPlacesState(places);
  }, [places, setPlacesState]);

  useEffect(() => {
    if (rangeValue > 200) {
      setZoom(18);
    }
    if (rangeValue > 400) {
      setZoom(17);
    }
    if (rangeValue > 500) {
      setZoom(16);
    }
    if (rangeValue > 700) {
      setZoom(15);
    }
  }, [rangeValue, filterValue]);

  const onMarkerClick = (
    _: google.maps.MapMouseEvent,
    placeId: string | undefined,
  ) => {
    placeId && setPlaceIdState(placeId);
    router.push(`/place/${placeId}`);
  };

  return (
    <section className="w-full h-full bg-slate-400">
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}
        loadingElement={<div>Loading...</div>}
        libraries={googleMapsLibraries}
      >
        <GoogleMap
          onClick={(e) => e.stop()}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            ...mapOptions,
            // restriction: {
            //   latLngBounds: seoulBound,
            //   strictBounds: true,
            // },
          }}
        >
          {typeof google !== 'undefined' && (
            <HeatmapLayerF
              data={[
                new google.maps.LatLng(37.5665, 126.978),
                new google.maps.LatLng(37.57, 126.981),
              ]}
              options={{
                maxIntensity: 3,
                gradient: ['rgba(255, 0, 0, 0)', 'rgba(255, 0, 0, 1)'],
                dissipating: true,
                opacity: 0.8,
                radius: 1,
              }}
            />
          )}

          {places?.map((place) => {
            if (!place.geometry?.location) {
              return;
            }
            return (
              <MarkerF
                key={place.place_id}
                position={place.geometry?.location}
                onClick={(e) => onMarkerClick(e, place.place_id)}
              />
            );
          })}
        </GoogleMap>
      </LoadScriptNext>
    </section>
  );
};

export default Map;
