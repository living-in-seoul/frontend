import { Comment, detailColThreeDotIcon } from '@/utils/Icon';
import Icons from '../../common/Icons';
import UserProfile from '../../item/UserProfile';

const DetailReCommentItem = ({
  reCommentData,
}: {
  reCommentData: ReComment;
}) => {
  const {
    createdAt,
    nickname,
    reComment,
    reCommentHasLiked,
    reCommentId,
    userImg,
  } = reCommentData;
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
        <span className="bg-neutral-100 p-2 rounded-lg text-xs">
          {reComment}
        </span>
        <div className="flex flex-row gap-3">
          <div className="flex flex-row gap-1 items-center"></div>
          <div className="flex flex-row gap-1 items-center"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailReCommentItem;
