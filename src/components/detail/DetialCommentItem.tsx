import { Comment, detailColThreeDotIcon } from '@/utils/Icon';
import Icons from '../common/Icons';
import UserProfile from '../item/UserProfile';
import DetailLikeBtn from './DetailLikeBtn';

const DetialCommentItem = ({ commentData }: { commentData: Comment }) => {
  const { createdAt, nickname, comment } = commentData;
  return (
    <div
      // className="flex flex-col gap-2 relative h-[85px]"
      className="flex flex-col gap-2"
    >
      <div className="flex flex-row justify-between">
        <UserProfile createdAt={createdAt} nickname={nickname} />
        <Icons path={detailColThreeDotIcon} />
      </div>
      <div className="flex flex-col gap-2 w-5/6 ml-auto">
        <span className="bg-neutral-100 p-2 rounded-lg text-xs">{comment}</span>
        <div className="flex flex-row gap-1 items-center">
          <Icons
            path={Comment}
            option={{
              fill: 'none',
              stroke: '#404040',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          />
          <span className="text-xs text-neutral-600">답글쓰기</span>
        </div>
        <div className="flex flex-row gap-1 items-center">
          {/* <DetailLikeBtn hasLiked likeSize={} postId={} /> */}
          <span className="text-xs text-neutral-600">답글쓰기</span>
        </div>
      </div>
    </div>
  );
};

export default DetialCommentItem;
