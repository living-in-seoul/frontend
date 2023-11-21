import IndicatorSkeleton from '@/components/community/IndicatorSkeleton';
import PostItemSkeleton from '@/components/community/PostItemSkeleton';

const Loading = () => {
  return (
    <div>
      <PostItemSkeleton />
      <PostItemSkeleton />
      <IndicatorSkeleton />
    </div>
  );
};
export default Loading;
