import HomeSectionTitle from '../HomeSectionTitle';
import HomeTagSections from './HomeTagSections';
import HomeReviewLists from './HomeReviewLists';

interface HomeReviewSectionProps {
  hotTagReview: string[];
}

const HomeReviewSection = ({ hotTagReview }: HomeReviewSectionProps) => {
  const hashtags = hotTagReview[0];

  return (
    <article className="relative w-full border-t-[5px] pt-2.5 border-zinc-300 pb-5">
      {hotTagReview ? (
        <>
          <HomeTagSections HotTagReview={hotTagReview} hashtags={hashtags} />
          <HomeReviewLists hashtags={hashtags} />
        </>
      ) : (
        <>게시물이 없습니다.</>
      )}
    </article>
  );
};
export default HomeReviewSection;
