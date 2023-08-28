'use client';
import MapProvider from '@/context/MapProvider';
import { Libraries } from '@react-google-maps/api';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const DynamicMap = dynamic(() => import('../../components/map/TransportMap'), {
  ssr: false,
});

const TransPortPage = () => {
  const [library, setLibrary] = useState<Libraries>(['routes', 'geometry']);
  return (
    <>
      <MapProvider>
        <DynamicMap />
      </MapProvider>
    </>
  );
};
export default TransPortPage;
