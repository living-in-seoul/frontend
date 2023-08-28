'use client';

import { useCallback, useState } from 'react';

const ZOOM = 11;

const useMapInstance = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setZoom(ZOOM);
    map.setCenter(new google.maps.LatLng(37.5665, 126.977));
    setMap(map);
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    map;
    setMap(null);
  }, []);

  return { onLoad, onUnmount, map };
};

export default useMapInstance;
