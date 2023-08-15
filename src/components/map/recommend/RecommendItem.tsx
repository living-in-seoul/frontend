import StarRate from '@/components/common/StarRate';
import { getImageSrc } from '@/utils/utilFunc';
import Link from 'next/link';
import { choi, mrchoi } from '../../../../public';
import Image from 'next/image';

const RecommendItem = (place: google.maps.places.PlaceResult) => {
  const { name, place_id, photos, rating, user_ratings_total, vicinity } =
    place;
  const photoReference = photos?.[0].getUrl();
  console.log(photoReference);

  return (
    <div className="flex justify-between items-center h-16 px-6 my-6">
      <div>
        <Link
          href={`/place/${place_id}`}
          className="text-sm font-bold block max-w-xs overflow-wrap-break"
        >
          {name}
        </Link>
        <div className="text-xs text-neutral-500">{vicinity}</div>
        <div className="flex items-center text-xs  text-neutral-500 ">
          {rating && <StarRate rating={rating} />}
          {user_ratings_total && (
            <div className="pl-2">리뷰 {user_ratings_total}</div>
          )}
        </div>
      </div>
      <Image
        className="h-20 w-32 shadow-xl rounded-md "
        src={photoReference ? photoReference : choi}
        alt="main"
        width={300}
        height={300}
      />
    </div>
  );
};

export default RecommendItem;
