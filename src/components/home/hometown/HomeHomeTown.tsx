import HomeSectionTitle from '../HomeSectionTitle';
import HomeTagSections from '../review/HomeTagSections';
import dynamic from 'next/dynamic';
import PostItemSkeleton from '../../community/PostItemSkeleton';
import IndicatorSkeleton from '../../community/IndicatorSkeleton';
import HomeTownTagSections from './HomeHomeTownTagSections';

const DynamicReviewLists = dynamic(() => import('./HomeHomeTownLists'), {
  ssr: false,

  loading: () => (
    <div>
      <PostItemSkeleton />
      <PostItemSkeleton />
      <IndicatorSkeleton />
    </div>
  ),
});

const HomeHomeTownSection = async () => {
  const HotTagHomeTown = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/rank?category=동향소통`,
  ).then<string[]>((res) => res.json());
  const hashtags = HotTagHomeTown[0];

  return (
    <article className="relative w-full border-t-[5px] pt-2.5 border-zinc-300 pb-5">
      <HomeSectionTitle
        title="동향 사람들과 소통해 보세요"
        link="/community/communication"
      />
      <HomeTownTagSections
        HotTagHometownTag={HotTagHomeTown}
        hashtags={hashtags}
      />
      <DynamicReviewLists hashtags={hashtags} />
    </article>
  );
};
export default HomeHomeTownSection;
