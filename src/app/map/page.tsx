'use client';

import MapHeader from '@/components/map/MapHeader';

const MapPage = () => {
  return (
    <section className=" w-full h-full relative">
      <MapHeader />

      <div id="portal" />
      <div id="markerPortal" />
    </section>
  );
};
export default MapPage;
