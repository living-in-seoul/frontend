'use client';
import RecommendItem from '@/components/map/recommend/RecommendItem';
import { placeIdState, placesState } from '@/recoil/states';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

const RecommendPage = () => {
  const router = useRouter();
  const [places, setPlacesState] = useRecoilState(placesState);
  const [placeId, setPlaceIdState] = useRecoilState(placeIdState);

  const onClickHandler = (placeId: string | undefined) => {
    placeId && setPlaceIdState(placeId);
  };

  return (
    <section>
      {places.map((place) => {
        return (
          <Link
            key={place.place_id}
            href={`/place/${place.place_id}/2`}
            onClick={() => onClickHandler(place.place_id)}
          >
            <RecommendItem {...place} />
          </Link>
        );
      })}
    </section>
  );
};
export default RecommendPage;
