'use client';
import RecommendItem from '@/components/map/recommend/RecommendItem';
import { placeIdState, placesState } from '@/recoil/states';
import { useRecoilState } from 'recoil';

const RecommendPage = () => {
  const [places, setPlacesState] = useRecoilState(placesState);

  return (
    <section>
      {places.map((place) => (
        <RecommendItem key={place.place_id} {...place} />
      ))}
    </section>
  );
};
export default RecommendPage;
