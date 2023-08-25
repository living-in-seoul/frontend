'use client';
import Icons from '../common/Icons';
import { Like, largeEmptyHeart, largeHeart } from '@/utils/Icon';
import { revalidatePath } from 'next/cache';
import { useState, useTransition } from 'react';
import useSWR from 'swr';
interface DetailLikeBtnProps {
  likeSize: number;
  postId: number;
  hasLiked?: boolean;
  type?: 'detail' | 'comment';
}

const DetailLikeBtn = ({
  likeSize,
  postId,
  hasLiked,
  type = 'comment',
}: DetailLikeBtnProps) => {
  const [isPending, startTransition] = useTransition();
  const [LikeState, setLikeState] = useState<number>(likeSize);
  const [hasLikeState, setHasLikeState] = useState<boolean | undefined>(
    hasLiked,
  );
  const onClickHandler = async () => {
    try {
      const response = await fetch(`/api/comment/like/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => response.json());
    } catch (error) {
      setHasLikeState((prev) => !prev);
    }

    startTransition(() => {
      setLikeState((prev) => (hasLikeState ? prev + 1 : prev - 1));
      setHasLikeState((prev) => !prev);
    });
  };

  switch (type) {
    case 'detail':
      return (
        <>
          {!hasLikeState ? (
            <div
              onClick={onClickHandler}
              className="relative flex justify-center items-center"
            >
              <Icons path={largeHeart} fill="#404040" />
              <span className="absolute text-white ">{LikeState}</span>
            </div>
          ) : (
            <div
              onClick={onClickHandler}
              className="relative flex justify-center items-center"
            >
              <Icons
                path={largeEmptyHeart}
                fill="none"
                option={{ stroke: '#B8B8B8' }}
              />
              <span className="absolute  ">{LikeState}</span>
            </div>
          )}
        </>
      );
    case 'comment':
      return (
        <div className="flex gap-2">
          {hasLiked ? (
            <div>
              <Icons
                fill="red"
                className={'cursor-pointer'}
                path={Like}
                option={{
                  fill: '##404040',
                }}
              />
            </div>
          ) : (
            <div>
              <Icons
                path={Like}
                className={'cursor-pointer'}
                option={{
                  fill: '##404040',
                }}
              />
            </div>
          )}
          <div className="text-neutral-700 text-xs font-normal leading-3">
            {likeSize}
          </div>
        </div>
      );
  }
};
export default DetailLikeBtn;
