import { useCallback, useState } from 'react';

const useMapInstance = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const ZOOM = 17;

  const onLoad = useCallback(function callback(map: any) {
    console.log('맵 새로 가져옴!');
    map.setZoom(ZOOM);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return { onLoad, onUnmount, map };
};

export default useMapInstance;
