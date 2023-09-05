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
