'use client';

import { useRecoilState } from 'recoil';
import { filterState } from '@/recoil/mapStates';
import { Filters } from '@/utils/constants/constants';
import ButtonSet from '@/components/item/ButtonSet';

const LocationFilter = () => {
  const [filter, setFilterState] = useRecoilState(filterState);

  return (
    <div className="w-full bg-white">
      <ButtonSet
        categories={Filters.map((filter) => filter.name)}
        selectedCategory={filter}
        setSelectedCategory={(filter) => setFilterState(filter)}
      />
    </div>
  );
};

export default LocationFilter;
