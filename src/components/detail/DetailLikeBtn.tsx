'use client';

import usePosts from '@/hooks/usePosts';
import Icons from '../common/Icons';
import { Like, largeEmptyHeart, largeHeart } from '@/utils/Icon';

interface DetailLikeBtnProps {
  likeSize: number;
  postId: number;
  hasLiked?: boolean;
  onDetail?: boolean;
}

const DetailLikeBtn = ({
  likeSize,
  postId,
  hasLiked,
  onDetail = false,
}: DetailLikeBtnProps) => {
  const { setLike } = usePosts(true);
  const likeHandler = () => {
    setLike(postId);
  };
  const text = onDetail && 'detail';
  switch (text) {
    case 'detail':
      return (
        <>
          {hasLiked ? (
            <div
              onClick={likeHandler}
              className="relative flex justify-center items-center"
            >
              <Icons path={largeHeart} fill="#404040" />
              <span className="absolute text-white ">{likeSize}</span>
            </div>
          ) : (
            <div
              onClick={likeHandler}
              className="relative flex justify-center items-center"
            >
              <Icons
                path={largeEmptyHeart}
                fill="none"
                option={{ stroke: '#B8B8B8' }}
              />
              <span className="absolute  ">{likeSize}</span>
            </div>
          )}
        </>
      );
    default:
      return (
        <div className="flex gap-2">
          {hasLiked ? (
            <div onClick={likeHandler}>
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
            <div onClick={likeHandler}>
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
