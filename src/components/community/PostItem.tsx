import Image from 'next/image';
import Icons from '../common/Icons';
import { getTimeAgo } from '@/utils/utilFunc';

import { profile } from '../../../public';
import Select from '../common/Select';
import { Comment, Like } from '@/utils/Icon';
import CommunityLikeBtn from '@/app/(nav)/community/CommunityLikeBtn';

interface PostItemProps extends ResponsePost {}

const PostItem = ({ post, user }: PostItemProps) => {
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
      <div className="flex w-full">
        {/* 유저 */}
        <div className="relative shrink-0 w-[36px] h-[36px] rounded-full overflow-hidden">
          <Image
            src={profile}
            alt={`user`}
            fill
            className="absolute top-0"
            sizes={'36px'}
          />
        </div>

        <div className="flex flex-col gap-1 justify-center px-[10px]">
          <div className="flex items-center gap-2">
            {/* 닉네임 */}
            <h3 className="text-black text-xs font-semibold leading-3">
              {nickname}
            </h3>
            {/* 레벨 */}
            <p className="text-neutral-600 text-xs font-medium leading-3">
              Lv.1
            </p>
          </div>
          <div className="text-neutral-500 text-xs font-normal leading-3">
            {getTimeAgo(createdAt)} · 조회수 {postViewCount}
          </div>
        </div>
      </div>
      {/* 컨텐츠 */}
      <div className="w-full flex justify-between">
        <div className="flex basis-2/3 pt-4 whitespace-pre-wrap">
          <span className="w-full text-black text-xs font-normal leading-[18px]">
            {contents}
          </span>
        </div>
        {postImg && (
          <div className="relative w-16 h-16 bg-white rounded-xl shadow overflow-hidden">
            <Image
              src={profile}
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
          <CommunityLikeBtn likeSize={likeSize} postId={postId} />
        </div>
      </div>
    </article>
  );
};
export default PostItem;
