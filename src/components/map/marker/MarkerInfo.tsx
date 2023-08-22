'use client';
import ModalPortal from '../../modal/ModalPortal';
import { useEffect, useRef } from 'react';

interface MarkerInfo {
  map: google.maps.Map;
  children: React.ReactNode;
  position: LatLng;
}

const MarkerInfo = ({ map, position, children }: MarkerInfo) => {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null,
  );
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) {
      rootRef.current = document.getElementById('markerPortal');

      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position: position,
        content: rootRef.current,
      });
    }
  }, []);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.position = position;
      markerRef.current.map = map;
    }
  }, [map, position, children]);

  return (
    <ModalPortal nodeName="markerPortal">
      <div className="w-[20px] h-[20px] bg-black">{children}</div>
    </ModalPortal>
  );
};

export default MarkerInfo;
