import HomeSectionTitle from '../HomeSectionTitle';
import dynamic from 'next/dynamic';
import PostItemSkeleton from '../../community/PostItemSkeleton';
import IndicatorSkeleton from '../../community/IndicatorSkeleton';
import HomeTownTagSections from './HomeHomeTownTagSections';
import HomeReviewLists from '../review/HomeReviewLists';

interface HomeHomeTownSectionProps {
  HotTagHomeTown: string[];
}

const HomeHomeTownSection = ({ HotTagHomeTown }: HomeHomeTownSectionProps) => {
  const hashtags = HotTagHomeTown[0];

  return (
    <article className="relative w-full border-t-[5px] pt-2.5 border-zinc-300 pb-5">
      <HomeTownTagSections
        HotTagHometownTag={HotTagHomeTown}
        hashtags={hashtags}
      />
      <HomeReviewLists hashtags={hashtags} />
    </article>
  );
};
export default HomeHomeTownSection;
