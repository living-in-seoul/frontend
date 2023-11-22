import IndicatorSkeleton from '@/components/community/IndicatorSkeleton';
import PostItemSkeleton from '@/components/community/PostItemSkeleton';
import { PostSkeleton } from '@/components/home/HomeWeekleyItem';

const Loading = () => {
  return (
    <article className="relative w-full whitespace-nowrap scrollbar-hide overflow-x-auto">
      <ul className="flex gap-4 pl-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </ul>
    </article>
  );
};
export default Loading;
