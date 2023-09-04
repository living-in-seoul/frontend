import React from 'react';
import Icons from '../../common/Icons';
import { Like } from '@/utils/Icon';

interface LikeCommentCaseProps {
  hasLiked: boolean;
  likeSize: number;
  isLoading: boolean;
  likeHandler: () => void;
}

const LikeCommentCase = ({
  hasLiked,
  likeSize,
  isLoading,
  likeHandler,
}: LikeCommentCaseProps) => {
  return (
    <div className="flex gap-1 items-center">
      {hasLiked ? (
        <div onClick={isLoading ? () => {} : likeHandler}>
          <Icons
            fill="red"
            className={'cursor-pointer'}
            path={Like}
            option={{
              fill: '#787878',
            }}
          />
        </div>
      ) : (
        <div onClick={isLoading ? () => {} : likeHandler}>
          <Icons
            path={Like}
            className={'cursor-pointer'}
            option={{
              fill: '#787878',
            }}
          />
        </div>
      )}
      <div className="text-neutral-500 text-xs font-normal leading-3">
        좋아요 {likeSize}
      </div>
    </div>
  );
};

export default LikeCommentCase;
