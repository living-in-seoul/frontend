'use client';
import { LoadScriptNext } from '@react-google-maps/api';
import { ReactNode } from 'react';

interface MapProviderProps {
  children: ReactNode;
}

const MapProvider = ({ children }: MapProviderProps) => {
  return (
    <LoadScriptNext
      googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
    >
      <>{children}</>
    </LoadScriptNext>
  );
};
export default MapProvider;
