import HomeSectionTitle from '../HomeSectionTitle';
import HomeTagSections from './HomeTagSections';
import dynamic from 'next/dynamic';
import PostItemSkeleton from '../../community/PostItemSkeleton';
import IndicatorSkeleton from '../../community/IndicatorSkeleton';

const DynamicReviewLists = dynamic(() => import('./HomeReviewLists'), {
  ssr: false,

  loading: () => (
    <div>
      <PostItemSkeleton />
      <PostItemSkeleton />
      <IndicatorSkeleton />
    </div>
  ),
});

const HomeReviewSection = async () => {
  const HotTagReview = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/rank?category=후기`,
  ).then<string[]>((res) => res.json());
  const hashtags = HotTagReview[0];

  return (
    <article className="relative w-full border-t-[5px] pt-2.5 border-zinc-300 pb-5">
      <HomeSectionTitle
        title="이웃이 남긴 후기를 살펴보세요"
        link="/community?category=review"
      />
      {HotTagReview ? (
        <>
          <HomeTagSections HotTagReview={HotTagReview} hashtags={hashtags} />
          <DynamicReviewLists hashtags={hashtags} />
        </>
      ) : (
        <>게시물이 없습니다.</>
      )}
    </article>
  );
};
export default HomeReviewSection;
