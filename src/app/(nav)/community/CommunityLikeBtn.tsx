'use client';
import Icons from '@/components/common/Icons';
import { Like } from '@/utils/Icon';
import { useState } from 'react';

interface CommunityLikeBtnProps {
  likeSize: number;
  postId: number;
}

const CommunityLikeBtn = ({ likeSize, postId }: CommunityLikeBtnProps) => {
  const [likeCount, setLikeCount] = useState(likeSize);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = async () => {
    const res = await fetch(`/api/community/like`, {
      method: 'POST',
      body: JSON.stringify({ postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex gap-2">
      {isLiked ? (
        <Icons
          fill="red"
          className={'cursor-pointer'}
          path={Like}
          option={{
            fill: '##404040',
          }}
          onClick={() => {
            setIsLiked(false);
          }}
        />
      ) : (
        <Icons
          path={Like}
          className={'cursor-pointer'}
          onClick={() => likeHandler()}
          option={{
            fill: '##404040',
          }}
        />
      )}
      <div className="text-neutral-700 text-xs font-normal leading-3">
        {likeSize}
      </div>
    </div>
  );
};
export default CommunityLikeBtn;
