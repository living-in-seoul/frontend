import Icons from '@/components/common/Icons';
import { TopFiveHeart } from '@/utils/Icon';
import Image from 'next/image';
import { imageNone, seole } from '../../../public';
import { ViewWeeklyIcon } from '../profile/editpage/EditImageIcon';

const HomeWeekleyItem = ({ post, user }: ResponsePost) => {
  const postImage = post.postImg[0] ? post.postImg[0].postImg : imageNone;
  const userName = user.nickname.slice(0, 8);
  return (
    <li>
      <div key={post.postId} className="flex flex-col">
        <div className="relative w-32 h-44 bg-white rounded-2xl shadow overflow-hidden">
          <Image
            src={postImage}
            alt={`${userName} 의 이미지`}
            fill
            sizes="250px"
            className="relative"
          />
          <div className="absolute bottom-2.5 right-2.5 w-14 h-5 bg-zinc-300 rounded-3xl">
            <div className="w-full h-full gap-1 px-[9px] flex justify-center items-center">
              <Icons
                fill="none"
                path={TopFiveHeart}
                option={{ fill: '#787878' }}
              >
                <ViewWeeklyIcon />
              </Icons>

              <div className="text-black text-xs font-normal">
                {post.postViewCount}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full py-5 gap-2">
          <div className="w-full flex gap-2">
            <span className="text-black text-sm font-semibold leading-3">
              {userName}
            </span>
            <span className="text-neutral-600 text-sm font-medium leading-3">
              {/* Lv.1 */}
            </span>
          </div>
          <div className="text-black text-base font-normal leading-3">
            {'#' + post.hashtag.split('#')[1]}
          </div>
        </div>
      </div>
    </li>
  );
};
export default HomeWeekleyItem;
