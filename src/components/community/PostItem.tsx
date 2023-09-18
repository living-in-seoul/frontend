import Image from 'next/image';
import Select from '../common/Select';
import UserProfile from '../item/UserProfile';

interface PostItemProps extends ResponsePost {
  category?: string;
  tags?: string | never[] | null | string[];
  isPop?: SelectPopType;
  onMap?: boolean;
  border?: boolean;
}

const PostItem = ({ post, user, onMap, hasLiked, border }: PostItemProps) => {
  const {
    content,
    postImg,
    hashtag,
    category,
    createdAt,
    postViewCount,
    likeSize,
    commentSize,
    postId,
  } = post;
  const { nickname, userImg } = user;
  const FullContent = content.length > 100;
  const shortContent = content.slice(0, 100);
  const userName = user.nickname.slice(0, 10);

  const HastagsContent = (hashtag: string) => {
    const HashTags = hashtag.split('#').slice(0);

    return (
      <ul className="flex gap-2">
        {HashTags.map((tag, index) => {
          if (index === 0) return;
          return (
            <li key={tag + index} className="flex items-center">
              <span className="text-neutral-600 text-xs font-normal leading-3">
                {'#'}
              </span>
              <span className="text-black text-xs font-medium leading-3">
                {tag}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };
  const contents = (
    <>
      {FullContent ? shortContent + '...' : content}
      {FullContent && (
        <span className="pl-2 text-zinc-400 text-xs font-normal leading-none">
          더보기
        </span>
      )}
    </>
  );
  return (
    <article
      className={`flex flex-col ${
        border && 'border-b border-zinc-300'
      } px-4 pt-[25px]`}
    >
      <UserProfile
        createdAt={createdAt}
        nickname={nickname}
        postViewCount={postViewCount}
        onMap={onMap}
        userImg={userImg}
      />
      {/* 컨텐츠 */}
      <div className="w-full flex justify-between min-h-[64px]">
        <div className="flex basis-2/3 pt-4 whitespace-pre-wrap">
          <span className="w-full text-black text-xs font-normal whitespace-pre-wrap leading-[18px]">
            {contents}
          </span>
        </div>
        {postImg[0] && /\.(jpg|jpeg|png)$/i.test(postImg[0].postImg) && (
          <div className="relative w-16 h-16 bg-white rounded-xl shadow overflow-hidden">
            <Image
              src={postImg[0]?.postImg}
              alt={`postImg`}
              fill
              sizes={'33vh'}
              priority
            />
          </div>
        )}
      </div>
      {/* 태그 후기 좋아요 */}
      <div className="flex justify-between py-4 items-center">
        <div className="flex gap-2">
          <Select
            disable
            title={category}
            className="rounded-3xl"
            size="small"
          />
          <div className="flex justify-center items-center">
            {HastagsContent(hashtag)}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="text-neutral-500 text-xs font-normal leading-3">
            좋아요 {likeSize}
          </div>
          <div className="text-neutral-500 text-xs font-normal leading-3">
            댓글 {commentSize}
          </div>
        </div>
      </div>
    </article>
  );
};
export default PostItem;
