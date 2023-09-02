'use client';

import DetailComment from '@/components/detail/comment/DetailComment';
import DetailHeader from '@/components/detail/DetailHeader';
import DetailHotHashtag from '@/components/detail/DetailHotHashtag';
import DetailMain from '@/components/detail/main/DetailMain';
import useSWR from 'swr';

import DetailNavbar from '@/components/detail/DetailNavbar';
import BeatLoader from '@/components/common/Spinner';
import { useEffect } from 'react';
interface DetailPageProps {
  params: {
    slug: string;
  };
}

const DetailPage = ({ params }: DetailPageProps) => {
  const { slug: postId } = params;
  useEffect(() => {
    localStorage.setItem('postId', postId);
  }, [postId]);
  const { data: detailData, isLoading } = useSWR(`/api/post/${postId}`);
  return (
    <section className="w-full max-w-2md h-screen relative">
      {isLoading ? (
        <div className="flex h-screen justify-center items-center">
          <BeatLoader />
        </div>
      ) : (
        <>
          <DetailHeader data={detailData} />
          <DetailMain data={detailData} />
          <DetailComment />
          <DetailHotHashtag data={detailData} />
        </>
      )}
      <DetailNavbar />
      <div className="flex w-full h-16"></div>
    </section>
  );
};

export default DetailPage;

//
