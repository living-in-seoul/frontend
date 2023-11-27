import { SelectSkeletons } from '@/components/common/Select';
import PostItemSkeleton from '@/components/community/PostItemSkeleton';
import { MockHasTagMapContent } from '@/components/home/HomeHasTagMapSection';
import { MockSelectedLocation } from '@/components/write/location/SelectedLocation';

const Loading = () => {
  return (
    <article className="relative w-full pt-2.5 border-b">
      <ul className="pl-4 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
        <SelectSkeletons />
      </ul>
      <MockHasTagMapContent />
      <PostItemSkeleton />
      <MockSelectedLocation />
    </article>
  );
};
export default Loading;
