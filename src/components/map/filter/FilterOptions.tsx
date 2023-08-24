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
    <div className="flex justify-between items-center w-full px-6 py-5 h-10 ">
      {LINK_NAME.map(({ name, link }, i) => {
        const selected = filterOption === link;
        return (
          <Select
            key={i}
            size="medium"
            title={name}
            onClick={() => onClickToSet(link)}
            select={selected}
          />
        );
      })}
    </div>
  );
};

export default FilterOptions;
