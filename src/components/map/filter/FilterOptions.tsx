'use client';

import CategoryList from '@/components/item/CategoryList';
import { filterOptionState, markerIdState } from '@/recoil/mapStates';
import { MapBoardOptions } from '@/utils/constants/constants';
import { useRecoilState, useSetRecoilState } from 'recoil';

const FilterOptions = () => {
  const [filterOption, setFilterOptionState] =
    useRecoilState(filterOptionState);
  const setMarkerIdState = useSetRecoilState(markerIdState);

  const onClickToSet = (filter: string) => {
    setFilterOptionState(filter);
    setMarkerIdState(null);
  };

  return (
    <div className="flex justify-center items-center w-full h-[20%] ">
      <CategoryList
        categories={MapBoardOptions}
        selectedCategory={filterOption}
        setSelectedCategory={(filter) => onClickToSet(filter)}
        dropdown
      />
    </div>
  );
};

export default FilterOptions;
