'use client';

import FilterModalRadius from '../../common/Slider';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { filterOptionState, openFilterState } from '@/recoil/mapStates';
import Button from '@/components/common/Button';
import LocationFilter from './LocationFilter';
import Slider from '../../common/Slider';
import LocationTypeFilter from './LocationTypeFilter';

const FilterModal = () => {
  const [filterOption, setFilterOptionState] =
    useRecoilState(filterOptionState);
  const openFilterValue = useRecoilValue(openFilterState);
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
        return <LocationFilter />;
      case '장소유형':
        return <LocationTypeFilter />;
      case '거리':
        // return <Slider range={range} setRange={setRangeState} />;
        return;

      default:
        break;
    }
  };

  return (
    <div className="fixed top-28 left-0 w-full flex flex-col justify-center items-center  bg-white px-4">
      {openFilterValue && <>{switchOptions()}</>}

      <div className="flex justify-between items-center gap-3 my-2">
        <Button
          size="medium-large"
          title="초기화"
          border="border border-zinc-500"
          onClick={onResetFilterModal}
        ></Button>
        <Button
          size="medium-large"
          title="필터 적용"
          border="border border-zinc-500"
          onClick={onCloseFilterModal}
        ></Button>
      </div>
    </div>
  );
};

export default FilterModal;
