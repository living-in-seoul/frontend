'use client';

import MapHeader from '@/components/map/MapHeader';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('../../../components/map/Map'), {
  ssr: true,
});

const MapPage = () => {
  return (
    <section className=" w-full h-full relative">
      <MapHeader />
      <DynamicMap />
      <div id="portal" />
    </section>
  );
};
export default MapPage;
