'use client';

import BeatLoader from '@/components/common/Spinner';
import PostItem from '@/components/community/PostItem';
import PostItemSkeleton from '@/components/community/PostItemSkeleton';
import useObserver from '@/hooks/useObserver';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const MypageList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [listTotalPage, setlistTotalPage] = useState();
  const [lastItem, setLastItem] = useState(false);
  const params = useSearchParams();
  const [myPageData, setMyPageData] = useState<ResponseMyPostData>();
  const [ref, inview] = useObserver();
  const category = params.get('category');
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await fetch(`api/mypage/${category}?page=${page}`)
        .then((response) => response.json())
        .then((response) => setMyPageData(response));
    };
    try {
      fetchData();
    } finally {
      setIsLoading(false);
    }
  }, [category, page]);

  useEffect(() => {
    if (inview && !isLoading) {
      // loadMoreList();
    }
  }, [inview]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <BeatLoader />
        </div>
      ) : (
        <div>
          {myPageData &&
            myPageData.result?.map((data) => (
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
      <div ref={ref} className="flex flex-col sm:col-span-2 ">
        <PostItemSkeleton />
        <PostItemSkeleton />
        <PostItemSkeleton />
      </div>
    </>
  );
};

export default MypageList;

// const tokenValidResponse = await fetch('/api/user', {
//   method: 'GET',
// });

// if (tokenValidResponse.status === 200) {
//   try {
//   } catch (e) {
//     alert('게시물 작성 실패!');
//   }
// } else {
//   alert('로그인 모달 나와주세요');
// }
