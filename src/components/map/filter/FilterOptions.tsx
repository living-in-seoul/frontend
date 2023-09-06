'use client';

import { useEffect, useState } from 'react';
import Select from '@/components/common/Select';
import { filterOptionState, markerIdState } from '@/recoil/mapStates';
import { LINK_NAME } from '@/utils/constants/board';
import { useRecoilState, useSetRecoilState } from 'recoil';

const FilterOptions = () => {
  const [filterOption, setFilterOptionState] =
    useRecoilState(filterOptionState);
  const setMarkerIdState = useSetRecoilState(markerIdState);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const onClickToSet = (filter: string | null) => {
    if (filter) {
      setFilterOptionState(filter);
      setMarkerIdState(null);
    } else {
      setFilterOptionState('All');
      setMarkerIdState(null);
    }
  };

  return (
    <div className="relative flex justify-between items-center w-full px-5 my-3 gap-2 ">
      {LINK_NAME.map(({ name, link }, i) => {
        const selected =
          filterOption === link || (link === null && filterOption === 'All');
        return (
          <div key={i} className="w-20 h-8">
            <Select
              size="full"
              title={name}
              onClick={() => onClickToSet(link)}
              select={selected}
            />
          </div>
        );
      })}
      {isVisible && (
        <div className="absolute top-[-10px] left-5 text-[11px] w-[150px] p-2 rounded-xl bg-darkMint text-white">
          지도를 드래그하면 실시간으로 변경된 지역이 반영됩니다.
          <div className="absolute top-[-4px] left-[50%] w-2 h-2 -translate-x-1/2 bg-darkMint transform rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
