import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';
import React, { useRef, useState, useEffect } from 'react';
import MapBottomSheet from './bottomsheet/MapBottomSheet';
import { MapStyleVersionThree } from '@/utils/styles';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 37.5665,
  lng: 126.978,
};

const MyMap: React.FC = () => {
  const [directions, setDirections] = useState<any>(null);
  const [hasRequested, setHasRequested] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const directionsPanelRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(pos);
      });
    }
  }, []);

  const directionsCallback = (
    response: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus,
  ) => {
    if (response !== null) {
      if (status === 'OK') {
        setDirections(response);
      } else {
        console.error('Error fetching directions', response);
      }
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      options={
        {
          // styles: MapStyleVersionThree,
        }
      }
    >
      {currentLocation && !hasRequested && (
        <DirectionsService
          options={{
            origin: currentLocation,
            // 강남역 위도, 경도
            destination: new google.maps.LatLng(37.3948, 127.1112),
            travelMode: google.maps.TravelMode.TRANSIT,
          }}
          callback={(response, status) => {
            directionsCallback(response, status);
            setHasRequested(true);
          }}
        />
      )}
      {directions && (
        <DirectionsRenderer
          options={{
            directions: directions,
            panel: directionsPanelRef.current,
          }}
        />
      )}
      <MapBottomSheet>
        <div ref={directionsPanelRef} className="w-full"></div>
      </MapBottomSheet>
    </GoogleMap>
  );
};

export default MyMap;
// 1. 맵 진입시 초기화면 + 검색창(위) + 저장된 출발 목적지(바텀시트) + 본인위치 찍기
// 1-1 맵 검색시 우 출발 도착 정하기
// 1-2 출발시간 , 도착시간 정하기
// 1-3 경로 저장 및 경로확인 페이지
// 1-4
