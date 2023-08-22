'use client';

import Select from '@/components/common/Select';
import CategoryList from '@/components/item/CategoryList';
import { filterOptionState, markerIdState } from '@/recoil/mapStates';
import { MapBoardOptions } from '@/utils/constants/constants';
import Link from 'next/link';
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
    <div className="flex justify-between items-center w-full px-6 py-5 h-10 ">
      {MapBoardOptions.map((option, i) => {
        const selected = filterOption === option;
        return (
          <Select
            className={`${selected && 'text-white'}`}
            key={i}
            size="medium"
            title={option}
            onClick={() => onClickToSet(option)}
            select={selected}
          />
        );
      })}
    </div>
  );
};

export default FilterOptions;
