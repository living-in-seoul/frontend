'use client';

import { hasLocation } from '@/recoil/mapStates';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';

const useMapInstance = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const hasLocationValue = useRecoilValue(hasLocation);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      map.setZoom(hasLocationValue ? 14 : 10);
      map.setCenter(new google.maps.LatLng(37.5665, 126.977));
      setMap(map);
    },
    [hasLocationValue],
  );

  const onUnmount = useCallback((map: google.maps.Map) => {
    map;
    setMap(null);
  }, []);

  return { onLoad, onUnmount, map };
};

export default useMapInstance;
