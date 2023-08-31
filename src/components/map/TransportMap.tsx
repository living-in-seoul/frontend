'use client';

import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  MarkerClustererF,
  MarkerF,
  MarkerClusterer,
  Marker,
} from '@react-google-maps/api';
import React, { useRef, useState, useEffect } from 'react';
import MapBottomSheet from './bottomsheet/MapBottomSheet';

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

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const pos = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };
  //       setCurrentLocation(pos);
  //     });
  //   }
  // }, []);

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
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const defaultCenter = {
    lat: 37.5665,
    lng: 126.978,
  };

  const markers = [
    { lat: 37.5715, lng: 126.978 },
    { lat: 37.5715, lng: 126.978 },
    { lat: 37.5715, lng: 126.978 },
    // ... 다른 위치 데이터
  ];
  const location = [
    { lat: 37.5655, lng: 126.971 },
    { lat: 37.5665, lng: 126.973 },
    { lat: 37.5675, lng: 126.975 },
    { lat: 37.5685, lng: 126.977 },
    { lat: 37.5695, lng: 126.979 },
  ];
  function customCalculator(markers: any[], num: number) {
    // 클러스터에 포함된 마커들을 콘솔에 출력
    markers.forEach((marker) => {
      console.log(marker.getPosition()); // 각 마커의 위치 출력
      // 필요한 경우 marker의 다른 속성들도 출력할 수 있습니다.
    });

    var count = markers.length;
    var index = 1;

    return {
      text: count.toString(),
      index: index,
    };
  }
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
      onCenterChanged={() => console.log('center changed')}
      onMouseOut={() => console.log('asdfasdf clicked')}
    >
      <MarkerClusterer calculator={customCalculator}>
        {(clusterer) => (
          <>
            <MarkerF
              key="marker1"
              position={location[0]}
              clusterer={clusterer}
            />

            <MarkerF
              key="marker2"
              position={location[1]}
              clusterer={clusterer}
            />

            <MarkerF
              key="marker3"
              position={location[2]}
              clusterer={clusterer}
            />

            <MarkerF
              key="marker4"
              position={location[3]}
              clusterer={clusterer}
            />

            <MarkerF
              key="marker5"
              position={location[4]}
              clusterer={clusterer}
            />
          </>
        )}
      </MarkerClusterer>
    </GoogleMap>
  );
};

export default MyMap;
// 1. 맵 진입시 초기화면 + 검색창(위) + 저장된 출발 목적지(바텀시트) + 본인위치 찍기
// 1-1 맵 검색시 우 출발 도착 정하기
// 1-2 출발시간 , 도착시간 정하기
// 1-3 경로 저장 및 경로확인 페이지
// 1-4 바텀시트에 경로 확인 및 경로 정하기
// 등등
