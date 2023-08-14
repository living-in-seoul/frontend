'use client';
import {
  GoogleMap,
  Libraries,
  LoadScriptNext,
  MarkerF,
  useLoadScript,
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

const libraries: Libraries = ['places'];

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

  // useEffect(() => {
  //   setPlacesState(places);
  // }, [places, setPlacesState]);

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
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        ></GoogleMap>
      </LoadScriptNext>
    </section>
  );
};

export default Map;
