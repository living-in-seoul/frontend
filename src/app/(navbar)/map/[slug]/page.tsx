import MultiPleCard from '@/components/common/MultiPleCard';
import PopCarousel from '@/components/common/PopCarousel';
import CommunityBoardList from '@/components/community/CommunityBoardList';
import DetailPlaceInfo from '@/components/detail/DetailPlaceInfo';
import DetailReviewerPictuers from '@/components/detail/DetailReviewerPictuers';
import { getPlaceByPlaceId } from '@/service/map';
import Image from 'next/image';

interface MapDetail {
  params: {
    slug: string;
  };
}

const MapDetail = async ({ params }: MapDetail) => {
  const data = await getPlaceByPlaceId(params.slug).then(
    (response) => response.result,
  );
  return (
    <>
      <Image
        className="w-full h-52 bg-zinc-300 flex items-center justify-center "
        alt="good dog"
        src={'/dog.jpg'}
        width={30000000000}
        height={30000000000}
      />
      <div className="px-4">
        <DetailPlaceInfo data={data} />
        <DetailReviewerPictuers photos={data.photos} />
        <CommunityBoardList title="커뮤니티에 등록한 리뷰" image={true} />
      </div>
      {/* <PopCarousel>
        <MultiPleCard {...data} />
      </PopCarousel> */}
    </>
  );
};

export default MapDetail;
