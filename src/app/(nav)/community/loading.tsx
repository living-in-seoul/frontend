import Select, { SelectSkeletons } from '@/components/common/Select';
import IndicatorSkeleton from '@/components/community/IndicatorSkeleton';
import PostItemSkeleton from '@/components/community/PostItemSkeleton';

const Loading = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full border-b py-6">
        <h1 className="w-full text-gray1 py-3 px-4 text-lg font-semibold leading-none">
          현재 HOT한 해시태그
        </h1>
        <ul className="py-3 pl-4 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
          <SelectSkeletons />
          <SelectSkeletons />
        </ul>
      </div>
      <div className="w-full justify-between flex px-4 py-6 ">
        <div className="flex gap-2.5">
          <Select title="최신순" />
          <Select title="인기순" />
        </div>
      </div>
      <PostItemSkeleton />
      <PostItemSkeleton />
      <IndicatorSkeleton />
    </div>
  );
};
export default Loading;
