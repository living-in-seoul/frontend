import Image from 'next/image';
import Icons from '../common/Icons';
import { getTimeAgo } from '@/utils/utilFunc';

import { profile } from '../../../public';
import Select from '../common/Select';
import { Comment, Like } from '@/utils/Icon';
import CommunityLikeBtn from '@/app/(nav)/community/CommunityLikeBtn';
import UserProfile from '../item/UserProfile';

interface PostItemProps extends ResponsePost {
  category?: string;
  tags?: string | never[] | null | string[];
  isPop?: SelectPopType;

  onMap?: boolean;
}

const PostItem = ({ post, user, onMap, hasLiked }: PostItemProps) => {
  const {
    content,
    postImg,
    hashtag,
    category,
    createdAt,
    postViewCount,
    likeSize,
    postId,
  } = post;
  const { nickname, profileImg } = user;
  const FullContent = content.length > 100;
  const shortContent = content.slice(0, 100);
  const userName = user.nickname.slice(0, 10);

  const HastagsContent = (hashtag: string) => {
    const HashTags = hashtag.split('#').filter((tag) => tag !== '');
    return (
      <ul className="flex gap-2">
        {HashTags.map((tag, index) => (
          <div key={tag + index} className="flex items-center">
            <span className="text-neutral-600 text-xs font-normal leading-3">
              {'#'}
            </span>
            <span className="text-black text-xs font-medium leading-3">
              {tag}
            </span>
          </div>
        ))}
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
    <article className="flex flex-col border-b last:border-[0] px-4 pt-[25px]">
      <UserProfile
        createdAt={createdAt}
        nickname={nickname}
        postViewCount={postViewCount}
      />
      {/* 컨텐츠 */}
      <div className="w-full flex justify-between">
        <div className="flex basis-2/3 pt-4 whitespace-pre-wrap">
          <span className="w-full text-black text-xs font-normal leading-[18px]">
            {contents}
          </span>
        </div>
        {postImg[0] && (
          <div className="relative w-16 h-16 bg-white rounded-xl shadow overflow-hidden">
            <Image
              src={postImg[0]?.postImg}
              alt={`postImg`}
              fill
              className="w-full h-full"
              sizes={'100%'}
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
            className="rounded-md"
            size="small"
          />
          <div className="flex justify-center items-center">
            {HastagsContent(hashtag)}
          </div>
        </div>
        <div className="flex gap-2">
          <Icons
            path={Comment}
            option={{
              fill: 'none',
              stroke: '#404040',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          />
          {/* 댓글 숫자 */}
          <div className="text-neutral-700 text-xs font-normal leading-3">
            0
          </div>
          <CommunityLikeBtn
            likeSize={likeSize}
            postId={postId}
            hasLiked={hasLiked}
          />
        </div>
      </div>
    </article>
  );
};
export default PostItem;
