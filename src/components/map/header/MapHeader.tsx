'use client';

import FilterOptions from '../filter/FilterOptions';
import MapToggle from './MapToggle';

const MapHeader = () => {
  return (
    <section className=" flex flex-col justify-center items-center pb-2 absolute bg-white w-full top-0 h-28 z-10">
      <MapToggle />
      <FilterOptions />
    </section>
  );
};

export default MapHeader;
