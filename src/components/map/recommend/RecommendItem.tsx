import StarRate from '@/components/common/StarRate';
import { getImageSrc } from '@/utils/utilFunc';
import Link from 'next/link';
import { mrchoi } from '../../../../public';
import Image from 'next/image';

const RecommendItem = (place: google.maps.places.PlaceResult) => {
  const { name, place_id, rating, user_ratings_total, vicinity } = place;
  // const src = getImageSrc(data.photos[0]?.photo_reference) ?? mrchoi;

  const src = mrchoi;

  return (
    <section className="flex justify-between items-center h-16 px-6 my-6">
      <div>
        <Link
          href={`/map/${place_id}`}
          className="text-sm font-bold block max-w-xs overflow-wrap-break"
        >
          {name}
        </Link>
        <p className="text-xs text-neutral-500">{vicinity}</p>
        <div className="flex items-center text-xs  text-neutral-500 ">
          {rating && <StarRate rating={rating} />}
          {user_ratings_total && (
            <p className="pl-2">리뷰 {user_ratings_total}</p>
          )}
        </div>
      </div>
      <Image
        className="h-16 w-32 shadow-xl rounded-lg "
        src={mrchoi}
        alt="main"
      />
    </section>
  );
};

export default RecommendItem;
