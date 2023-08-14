import CommunityBoardList from '@/components/community/CommunityBoardList';

import DetailPlaceInfo from '@/components/detail/DetailPlaceInfo';
import DetailReviewerPictuers from '@/components/detail/DetailReviewerPictuers';
import { getPlaceByPlaceId } from '@/service/map';

import Image from 'next/image';
import { redirect } from 'next/navigation';
import { choi } from '../../../../../public';
interface MapDetailProps {
  params: {
    slug: string[];
  };
}

const MapDetail = async ({ params }: MapDetailProps) => {
  const { slug } = params;
  const [placeId, checkRedirect] = slug;
  const data = await getPlaceByPlaceId(placeId).then(
    (response) => response.result,
  );
  console.log(data);
  const mainPicture = data.photos
    ? `${process.env.NEXT_PUBLIC_GOOGLE_PHOTO_URL}?maxwidth=200&maxheigth=400&photo_reference=${data.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
    : choi;
  if (checkRedirect === '2') {
    redirect('/map');
  }

  return (
    <>
      <Image
        className=" h-52 bg-zinc-300 flex items-center justify-center w-full object-cover aspect-square "
        alt="good dog"
        src={mainPicture}
        width={3000}
        height={3000}
      />
      <div className="px-4 flex flex-col ">
        <DetailPlaceInfo data={data} />
        <DetailReviewerPictuers photos={data.photos} />
        <CommunityBoardList title="커뮤니티에 등록한 리뷰" image={true} />
      </div>
      {/* <PopCarousel>
        <DetailMultipleCard data={data} />
      </PopCarousel> */}
    </>
  );
};

export default MapDetail;