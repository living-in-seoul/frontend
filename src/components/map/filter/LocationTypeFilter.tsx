import ButtonSet from '@/components/common/ButtonSet';
import { locationTypeState } from '@/recoil/mapStates';
import { categories } from '@/utils/constants';
import { useRecoilState } from 'recoil';

const LocationTypeFilter = () => {
  const [locationType, setlocationTypeState] =
    useRecoilState(locationTypeState);

  return (
    <div className="w-full bg-white">
      <ButtonSet
        categories={categories}
        selectedCategory={locationType}
        setSelectedCategory={(type) => setlocationTypeState(type)}
      />
    </div>
  );
};

export default LocationTypeFilter;
