'use client';
import { Libraries, LoadScriptNext } from '@react-google-maps/api';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Loading from '../loading';

const DynamicMap = dynamic(() => import('../../components/map/TransportMap'), {
  ssr: false,
  loading: () => <Loading />,
});

const TransPortPage = () => {
  const [library, setLibrary] = useState<Libraries>(['routes', 'geometry']);
  return (
    <>
      <LoadScriptNext
        googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
        libraries={library}
        loadingElement={<Loading />}
      >
        <DynamicMap />
      </LoadScriptNext>
    </>
  );
};
export default TransPortPage;
