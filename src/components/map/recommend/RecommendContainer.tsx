'use client';

import RecommendItem from '@/components/map/recommend/RecommendItem';
import { placeIdState } from '@/recoil/mapStates';
import Link from 'next/link';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const RecommendContainer = () => {
  const setPlaceIdState = useSetRecoilState(placeIdState);

  const onClickHandler = (placeId: string | undefined) => {
    placeId && setPlaceIdState(placeId);
  };

  return (
    <div>
      {/* {placesValue.map((place) => {
        return (
          <Link
            key={place.place_id}
            href={`/place/${place.place_id}`}
            onClick={() => onClickHandler(place.place_id)}
          >
            <RecommendItem {...place} />
          </Link>
        );
      })} */}
    </div>
  );
};

export default RecommendContainer;
