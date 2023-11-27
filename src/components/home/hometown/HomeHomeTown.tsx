import HomeTownTagSections from './HomeHomeTownTagSections';
import HomeHomeTownLists from './HomeHomeTownLists';

interface HomeHomeTownSectionProps {
  HotTagHomeTown: string[];
}

const HomeHomeTownSection = ({ HotTagHomeTown }: HomeHomeTownSectionProps) => {
  const hashtags = HotTagHomeTown[0];

  return (
    <article className="relative w-full pt-2.5 pb-5">
      <HomeTownTagSections
        HotTagHometownTag={HotTagHomeTown}
        hashtags={hashtags}
      />

      <HomeHomeTownLists hashtags={hashtags} />
    </article>
  );
};
export default HomeHomeTownSection;
