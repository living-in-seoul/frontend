import Image from 'next/image';
import { imageNone } from '../../../public';
import Link from 'next/link';

export const PostSkeleton = () => {
  return (
    // <li>
    <div className="flex flex-col">
      <div className="skeleton relative w-32 h-44 bg-gray-200 rounded-2xl shadow overflow-hidden">
        {/* Skeleton Image */}
        <div className="w-full h-full bg-gray-300"></div>
        <div className="absolute bottom-2.5 right-2.5 w-14 h-5 bg-gray-300 rounded-3xl">
          {/* Skeleton View Count */}
          <div className="w-full h-full gap-1 flex justify-center items-center">
            <div className="skeleton w-8 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full py-5 gap-2">
        <div className="w-full flex gap-2">
          {/* Skeleton User Info */}
          <div className="skeleton w-16 h-2.5 bg-gray-300 rounded"></div>
          <div className="skeleton w-12 h-2.5 bg-gray-300 rounded"></div>
        </div>
        {/* Skeleton Hashtag */}
        <div className="skeleton w-28 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
    // </li>
  );
};

const HomeWeekleyItem = ({ post, user }: ResponsePost) => {
  const hasImage = !!post.postImg[0];
  const postImage = hasImage ? post.postImg[0].postImg : imageNone;
  const userName = user.nickname.slice(0, 8);
  return (
    <li>
      <div key={post.postId} className="flex flex-col">
        <Link
          href={`/detail/${post.postId}`}
          className="cursor-pointer select-none"
        >
          <div className="relative w-32 h-44 bg-white rounded-2xl shadow overflow-hidden">
            <Image
              src={postImage}
              alt={`${userName} 의 이미지`}
              fill
              sizes={'33vw'}
              className={`relative ${
                !hasImage && 'px-8 py-9'
              } select-auto object-cover`}
            />
            <div className="absolute bottom-2.5 right-2.5 w-14 h-5 bg-white rounded-3xl">
              <div className="w-full h-full gap-1 flex justify-center items-center">
                <span className="text-white text-xs font-normal">👀 </span>
                <span className="text-neutral-500 text-xs font-normal">
                  {post.postViewCount}
                </span>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex flex-col w-full py-5 gap-2">
          <div className="w-full flex gap-2">
            <div className="w-16 text-neutral-700 text-xs font-normal leading-3">
              {userName}
            </div>
            <span className="text-neutral-600 text-sm font-medium leading-3">
              {/* Lv.1 */}
            </span>
          </div>
          <div className="text-neutral-700 text-base font-semibold leading-3">
            {'#' + post.hashtag.split('#')[1]}
          </div>
        </div>
      </div>
    </li>
  );
};
export default HomeWeekleyItem;
