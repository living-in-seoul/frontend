'use client';
import CommunityBoardList from '@/components/community/CommunityBoardList';
import DetailPlaceInfo from '@/components/detail/DetailPlaceInfo';
import DetailReviewerPictuers from '@/components/detail/DetailReviewerPictuers';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { choi } from '../../../../public';
import { useEffect } from 'react';
interface MapDetailProps {
  params: {
    slug: string;
  };
}

const MapDetail = ({ params }: MapDetailProps) => {
  const router = useRouter();
  const { slug: placeId } = params;
  const {
    data: details,
    isLoading,
    error,
  } = useSWR(`/api/map/detail/${placeId}`);

  console.log(details);
  if (isLoading) {
    return <div>기다리세요</div>;
  }
  details.message === '회원전용입니다' && router.push('/signin');

  const photoReference = details?.photos?.[0]?.photo_reference;
  const mainPicture = photoReference
    ? `${process.env.NEXT_PUBLIC_GOOGLE_PHOTO_URL}?maxwidth=200&maxheigth=400&photo_reference=${photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
    : choi;

  // redirect(`/place/${placeId}`);
  return (
    <>
      <Image
        className=" h-52 bg-zinc-300 flex items-center justify-center w-full object-cover aspect-square "
        alt="good dog"
        src={mainPicture ?? choi}
        width={3000}
        height={3000}
      />
      <div className="px-4 flex flex-col ">
        <DetailPlaceInfo data={details} />
        <DetailReviewerPictuers photos={details?.photos} />
        <CommunityBoardList title="커뮤니티에 등록한 리뷰" image={true} />
      </div>
      {/* <PopCarousel>
        <DetailMultipleCard data={data} />
      </PopCarousel> */}
    </>
  );
};

export default MapDetail;
