'use client';

import { useCallback, useState } from 'react';

const useMapInstance = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const ZOOM = 14;
  const onLoad = useCallback((map: google.maps.Map) => {
    map.setZoom(ZOOM);

    setMap(map);
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    map;
    setMap(null);
  }, []);

  return { onLoad, onUnmount, map };
};

export default useMapInstance;

/*
1. 로컬스토리지에 저장된 구가 있으면 거기로 센터 줌 후 데이터 가져오기
2. 없다면 서울시 강남구 가져오기
*/
