import CommunityBoardList from '@/components/community/CommunityBoardList';
import DetailPlaceInfo from '@/components/detail/DetailPlaceInfo';
import DetailReviewerPictuers from '@/components/detail/DetailReviewerPictuers';
import { getPlaceByPlaceId } from '@/service/map';

import Image from 'next/image';
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
  const mainPicture = `${process.env.NEXT_PUBLIC_GOOGLE_PHOTO_URL}?maxwidth=400&maxheigth=800&photo_reference=${data.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;

  return (
    <>
      <Image
        className=" h-52 bg-zinc-300 flex items-center justify-center w-full object-cover aspect-square "
        alt="good dog"
        src={mainPicture}
        width={30000000000}
        height={30000000000}
      />
      <div className="px-4 flex flex-col">
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
