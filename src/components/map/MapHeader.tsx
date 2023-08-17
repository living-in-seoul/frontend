'use client';

import PlacesAutoComplete from '@/components/map/search/PlacesAutoComplete';
import FilterModal from '@/components/map/filter/FilterModal';
import { openFilterState } from '@/recoil/mapStates';
import { useRecoilValue } from 'recoil';
import FilterOptions from './filter/FilterOptions';

const MapHeader = () => {
  const openFilterValue = useRecoilValue(openFilterState);
  return (
    <section className=" flex flex-col justify-center items-center gap-4 pb-2 fixed bg-white w-full top-0 left-0 h-28 z-10">
      <PlacesAutoComplete />
      <FilterOptions />
      {openFilterValue && <FilterModal />}
    </section>
  );
};

export default MapHeader;
