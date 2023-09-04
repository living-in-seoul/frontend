'use client';
import { useEffect, useState } from 'react';
import PostItem from '../community/PostItem';
import { constSelector, useRecoilValue } from 'recoil';
import { postIdstate } from '@/recoil/BoardStates';

const DetailHotHashtag = ({ data }: { data: ResponseDetailData }) => {
  const [tagData, setTagData] = useState<ResponsePopularCategoryHashtag | null>(
    null,
  );
  const postId = useRecoilValue(postIdstate);
  const maintag = data.result.post.hashtag.split('#').filter((tag) => tag)[0];
  // useEffect(() => {
  //   const response = async () => {
  //     await fetch(`/api/post/${data.result.post.category}/${maintag}`)
  //       .then((response) => response.json())
  //       .then((response) => {
  //         setTagData(response);
  //       });
  //   };
  //   data && response();
  // }, [data.result.post.category, maintag]);
  return (
    <div>
      <span className="flex pt-6 font-semibold px-4">관련 해시태그 인기글</span>
      {tagData &&
        tagData.result
          .filter((data) => data.post.postId !== Number(postId))
          .map((data) => (
            <>
              <PostItem
                key={data.post.postId}
                location={data.location}
                post={data.post}
                user={data.user}
                hasLiked
              />
            </>
          ))}
    </div>
  );
};

export default DetailHotHashtag;
