'use client';

import CategoryList from '@/components/item/CategoryList';
import { filterOptionState } from '@/recoil/mapStates';
import { MapBoardOptions } from '@/utils/constants/constants';
import { useRecoilState } from 'recoil';

const FilterOptions = () => {
  const [filterOption, setFilterOptionState] =
    useRecoilState(filterOptionState);

  return (
    <div className="flex justify-center w-full h-full ">
      <CategoryList
        categories={MapBoardOptions}
        selectedCategory={filterOption}
        setSelectedCategory={(filter) => setFilterOptionState(filter)}
        dropdown
      />
    </div>
  );
};

export default FilterOptions;
