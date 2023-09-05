'use client';

import BeatLoader from '@/components/common/Spinner';
import PostItem from '@/components/community/PostItem';
import useObserver from '@/hooks/useObserver';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const MypageList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [myPostData, setMyPostData] = useState<PostResult[]>([]);
  const [myScrapData, setMyScrapData] = useState<PostResult[]>([]);
  const [ref, inview] = useObserver();
  const params = useSearchParams();
  const category = params?.get('category');
  const myPageData = category === 'myscrap' ? myScrapData : myPostData;
  useEffect(() => {
    setIsLoading(true);
    const loadMoreList = async () => {
      const data = await fetch(`api/mypage/${category}?page=${page}`)
        .then((response) => response.json())
        .finally(() => setIsLoading(false));
      if (data?.result.length) {
        setPage((prev) => prev + 1);
        category === 'myscrap'
          ? setMyScrapData((prev) => [...prev, ...data.result])
          : setMyPostData((prev) => [...prev, ...data.result]);
      }
    };
    loadMoreList();
  }, [category, page]);
  useEffect(() => {
    if (inview && !isLoading) {
      // loadMoreList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inview]);

  return (
    <>
      <Toaster />
      {isLoading ? (
        <div className="flex justify-center">
          <BeatLoader />
        </div>
      ) : (
        <div>
          {myPageData &&
            myPageData.map((data) => (
              <PostItem
                key={data.post.postId}
                location={data.location}
                post={data.post}
                user={data.user}
                hasLiked
              />
            ))}
        </div>
      )}
      <div ref={ref} className="flex flex-col sm:col-span-2 "></div>
    </>
  );
};

export default MypageList;
