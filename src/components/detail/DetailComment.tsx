import { Comment, Like, detailColThreeDotIcon } from '@/utils/Icon';
import Icons from '../common/Icons';
import UserProfile from '../item/UserProfile';
import CommunityLikeBtn from '@/app/(nav)/community/CommunityLikeBtn';
export interface DetailCommentProps {
  data: { commentSize: number; comments: Comment[] };
}

const DetailComment = ({ data }: DetailCommentProps) => {
  return (
    <div className="py-6 px-4 flex flex-col gap-4 border-b-2">
      <span className="font-semibold">댓글 {data.commentSize}</span>

      {data.comments.map((comment) => (
        <div
          // className="flex flex-col gap-2 relative h-[85px]"
          className="flex flex-col gap-2"
          key={comment.commentId}
        >
          <div className="flex flex-row justify-between">
            <UserProfile
              createdAt={comment.createdAt}
              nickname={comment.nickname}
            />
            <Icons path={detailColThreeDotIcon} />
          </div>
          <div className="flex flex-col gap-2 w-5/6 ml-auto">
            <span
              // className="bg-neutral-100 w-4/5 p-2 rounded-lg absolute right-0 bottom-0"
              className="bg-neutral-100 p-2 rounded-lg "
            >
              {comment.comment}
            </span>
            {/* <CommunityLikeBtn likeSize={likeSize} postId={postId} /> */}
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailComment;
