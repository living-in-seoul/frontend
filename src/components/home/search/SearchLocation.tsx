import { HomeSearchLocationState } from '@/recoil/homeState';
import { useRecoilState } from 'recoil';

const SearchLocation = () => {
  const [HomeSearchLocation, setHomeSearchLocation] = useRecoilState(
    HomeSearchLocationState,
  );
  return (
    <section className="absolute top-0 w-full h-full bg-white">Search</section>
  );
};

export default SearchLocation;
