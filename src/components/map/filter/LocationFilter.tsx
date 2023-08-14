import CategoryList from '@/components/common/CategoryList';
import { Filters } from '../constants';
import { useRecoilState } from 'recoil';
import { filterState } from '@/recoil/mapStates';

const LocationFilter = () => {
  const [filter, setFilterState] = useRecoilState(filterState);

  return (
    <div>
      <CategoryList
        categories={Filters.map((filter) => filter.name)}
        selectedCategory={filter}
        setSelectedCategory={(filter) => setFilterState(filter)}
        noScroll
      />
      ;
    </div>
  );
};

export default LocationFilter;
