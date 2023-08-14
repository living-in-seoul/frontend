import RecommendItem from '@/components/map/recommend/RecommendItem';
import { placeIdState, placesState } from '@/recoil/mapStates';
import Link from 'next/link';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const RecommendContainer = () => {
  const placesValue = useRecoilValue(placesState);
  const setPlaceIdState = useSetRecoilState(placeIdState);

  const onClickHandler = (placeId: string | undefined) => {
    placeId && setPlaceIdState(placeId);
  };
  return (
    <div>
      {placesValue.map((place) => {
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
    </div>
  );
};

export default RecommendContainer;
