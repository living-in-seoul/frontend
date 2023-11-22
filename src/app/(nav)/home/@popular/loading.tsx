import PostItemSkeleton from '@/components/community/PostItemSkeleton';
import { MockHasTagMapContent } from '@/components/home/HomeHasTagMapSection';
import { MockSelectedLocation } from '@/components/write/location/SelectedLocation';

const Loading = () => {
  return (
    <article className="relative w-full pt-2.5">
      <ul className="pl-4 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
        <li className="skeleton w-20 py-0.5 px-5 bg-gray-300 rounded-md font-normal justify-center items-center gap-2.5 inline-flex border-[1.125px] border-gray5">
          <span className="text-xs font-normal leading-7 text-gray-300">
            로딩중...
          </span>
        </li>
      </ul>
      <MockHasTagMapContent />
      <PostItemSkeleton />
      <MockSelectedLocation />
    </article>
  );
};
export default Loading;
