/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import UserProfile from '../item/UserProfile';
import PostItemBottom from './PostItemBottom';

interface CommunityPostItemProps extends ResponsePost {
  category?: string;
  tags?: string | never[] | null | string[];
  isPop?: SelectPopType;
  onMap?: boolean;
  userImg?: string;
}

const CommunityPostItem = ({
  userImg,
  post,
  user,
  onMap,
}: CommunityPostItemProps) => {
  const {
    content,
    postImg,
    hashtag,
    category,
    createdAt,
    postViewCount,
    likeSize,
    commentSize,
  } = post;
  const { nickname } = user;
  return (
    <article className="flex flex-col border-b-2 last:border-[0] px-4 pt-[25px]">
      <UserProfile
        userImg={userImg}
        createdAt={createdAt}
        nickname={nickname}
        postViewCount={postViewCount}
        onMap={onMap}
      />
      {/* 컨텐츠 */}
      <div className="w-full flex justify-between min-h-[36px] my-4">
        <span className="w-full text-black text-sm font-normal whitespace-pre-wrap leading-[21px]">
          {content}
        </span>
      </div>
      {postImg[0] && /\.(jpg|jpeg|png)$/i.test(postImg[0].postImg) && (
        <div className="relative w-full h-36 bg-white rounded-xl shadow overflow-hidden mb-2">
          <Image
            src={postImg[0]?.postImg}
            alt={`postImg`}
            fill
            priority
            sizes={'33vw'}
            quality={30}
            className="w-full h-full object-cover absolute top-0 object-center"
          />
        </div>
      )}
      {/* 태그 후기 좋아요 */}
      <PostItemBottom
        category={category}
        hashtag={hashtag}
        commentSize={commentSize}
        likeSize={likeSize}
      />
    </article>
  );
};

export default CommunityPostItem;
