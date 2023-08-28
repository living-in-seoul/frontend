import React from 'react';
import Icons from '../../common/Icons';
import { Like } from '@/utils/Icon';

interface LikeCommentCaseProps {
  hasLiked: boolean;
  likeSize: number;
  likeHandler: () => void;
}

const LikeCommentCase = ({
  hasLiked,
  likeSize,
  likeHandler,
}: LikeCommentCaseProps) => {
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
};

export default LikeCommentCase;
