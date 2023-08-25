'use client';
import { LoadScriptNext } from '@react-google-maps/api';
import { ReactNode } from 'react';

interface MapProviderProps {
  children: ReactNode;
  type?: string;
}

const MapProvider = ({ children, type = 'defalut' }: MapProviderProps) => {
  return (
    <LoadScriptNext
      googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
      loadingElement={
        type === 'home' ? (
          <div className="w-full p-4">
            <div className="skeleton bg-gray-200 w-full h-[260px] border overflow-hidden rounded-xl" />
          </div>
        ) : (
          <></>
        )
      }
    >
      <>{children}</>
    </LoadScriptNext>
  );
};
export default MapProvider;
