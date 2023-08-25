import HomeReviewSection from '@/components/home/HomeReview';
import HomeTopSection from '@/components/home/HomeTopSection';
import HomeWeekleyTopFiveSection from '@/components/home/HomeWeekleyTopFive';
import HomeHasTagMapSection from '../../../components/home/HomeHasTagMapSection';
import HomeHometownSection from '@/components/home/HomeHomeTownSection';
interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const HomePage = ({ params, searchParams }: PageProps) => {
  const { hashtag, locationTag, hometownTag } = searchParams;
  console.log(searchParams);
  return (
    <section
      className={`relative flex-col flex w-full justify-center h-full bg-white`}
    >
      <HomeTopSection />
      <HomeWeekleyTopFiveSection />
      <HomeReviewSection hashtag={hashtag} />
      <HomeHasTagMapSection hashtag={locationTag} />
      <HomeHometownSection hashtag={hometownTag} />
    </section>
  );
};
export default HomePage;
