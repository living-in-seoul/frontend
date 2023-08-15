'use client';

import CategoryList from '@/components/common/CategoryList';
import { filterOptionState, openFilterState } from '@/recoil/mapStates';
import { useRecoilState } from 'recoil';

const FilterOptions = () => {
  const [filterOption, setFilterOptionState] =
    useRecoilState(filterOptionState);

  const [openFilter, setOpenFilter] = useRecoilState(openFilterState);

  const onClickToOpenFilter = () => {
    setOpenFilter(true);
  };

  return (
    <div className="w-full px-5 ">
      <CategoryList
        categories={Options}
        selectedCategory={filterOption}
        setSelectedCategory={(filter) => setFilterOptionState(filter)}
        onClickToOpenFilter={onClickToOpenFilter}
        dropdown
      />
    </div>
  );
};

export default FilterOptions;

const Options = ['장소', '장소유형', '거리'];
