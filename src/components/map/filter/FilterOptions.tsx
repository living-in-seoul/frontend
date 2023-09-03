'use client';

import Select from '@/components/common/Select';
import { filterOptionState, markerIdState } from '@/recoil/mapStates';
import { LINK_NAME } from '@/utils/constants/board';
import { useRecoilState, useSetRecoilState } from 'recoil';

const FilterOptions = () => {
  const [filterOption, setFilterOptionState] =
    useRecoilState(filterOptionState);
  const setMarkerIdState = useSetRecoilState(markerIdState);

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
    <div className="flex justify-between items-center w-full px-5 my-3 gap-2 ">
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
    </div>
  );
};

export default FilterOptions;
