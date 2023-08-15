'use client';

import FilterModalRadius from '../../common/RangeSlider';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  filterOptionState,
  openFilterState,
  rangeState,
} from '@/recoil/mapStates';
import Button from '@/components/common/Button';
import LocationFilter from './LocationFilter';
import RangeSlider from '../../common/RangeSlider';

const FilterModal = () => {
  const [filterOption, setFilterOptionState] =
    useRecoilState(filterOptionState);
  const openFilterValue = useRecoilValue(openFilterState);
  const [range, setRangeState] = useRecoilState(rangeState);
  const setOpenFilterState = useSetRecoilState(openFilterState);

  const onCloseFilterModal = () => {
    setOpenFilterState(false);
    setFilterOptionState('');
  };

  const onResetFilterModal = () => {
    setOpenFilterState(false);
    setFilterOptionState('');
  };

  const switchOptions = () => {
    switch (filterOption) {
      case '장소':
        return (
          <>
            <LocationFilter />
          </>
        );
      case '장소유형':
        break;
      case '거리':
        return <RangeSlider range={range} setRange={setRangeState} />;

      default:
        break;
    }
  };

  return (
    <div className="fixed top-28 left-0 w-full flex flex-col justify-center items-center  bg-white px-4">
      {openFilterValue && <>{switchOptions()}</>}

      <div className="flex bg-black justify-between items-center ">
        <Button
          size="small"
          title="초기화"
          border="border border-zinc-500"
          onClick={onResetFilterModal}
        ></Button>
        <Button
          size="small"
          title="필터 적용"
          border="border border-zinc-500"
          onClick={onCloseFilterModal}
        ></Button>
      </div>
    </div>
  );
};

export default FilterModal;
