'use client';

import {
  filterState,
  placeIdState,
  rangeState,
  selectDongPlaceState,
  selectGuPlaceState,
} from '@/recoil/mapStates';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useMapInstance from '@/hooks/useMapInstance';
import { useRouter } from 'next/navigation';
import { MapStyleVersionTwo } from '@/utils/styles';

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
  const [selectedDong, setSelectedDong] = useRecoilState(selectDongPlaceState);
  const { data: locationDetail } = useSWR<PlaceByPlaceIdResponse>(
    placeId ? `api/map/places/${placeId}` : null,
    null,
    {
      focusThrottleInterval: 5000,
    },
  );
  const placeGu = useRecoilValue(selectGuPlaceState);
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

  const fetcherURL = placeGu ? `api/map/seoul/dong?guName=${placeGu}` : null;
  const { data: dongs } = useSWR<Dong>(fetcherURL);

  useEffect(() => {
    if (map && locationDetail) {
      map.panTo(locationDetail.result.geometry.location);
      setCenter(locationDetail.result.geometry.location);
    }
  }, [locationDetail, map]);

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

  return <section></section>;
};

const MarkerIcons = {
  restaurants: 'http://localhost:3000/marker/restaurants.png',
};

export default Map;
