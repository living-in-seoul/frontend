import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import HomeTopSection from '@/components/home/HomeTopSection';
import HomePlaceComponent from '@/components/home/homeplace/HomePlaceComponent';
import YouthList from '@/components/youth/YouthList';
import {
  getHomeDatas,
  getHotTagHomeTown,
  getHotTagMap,
  getHotTagReview,
  getHotTagTopFive,
  getYouth,
} from '@/service/home';
import dynamic from 'next/dynamic';

const DynamicTopFiveSection = dynamic(
  () => import('@/components/home/HomeWeekleyTopFive'),
);

const DynamicReviewSection = dynamic(
  () => import('@/components/home/review/HomeReview'),
);

const DynamicMapSection = dynamic(
  () => import('@/components/home/HomeHasTagMapSection'),
);
const DynamicHomeHomeTownSection = dynamic(
  () => import('@/components/home/hometown/HomeHomeTown'),
);

const HomePage = async () => {
  const youthListPromise = getYouth();
  const placeListPromise = getHomeDatas();
  const weekleyTopFivePromise = getHotTagTopFive();
  const hotTagReviewPromise = getHotTagReview();
  const locationTagPromise = getHotTagMap();
  const homeTownTagPromise = getHotTagHomeTown();

  const [
    youthList,
    placeList,
    weekleyTopFive,
    hotTagReview,
    locationTag,
    homeTownTag,
  ] = await Promise.all([
    youthListPromise,
    placeListPromise,
    weekleyTopFivePromise,
    hotTagReviewPromise,
    locationTagPromise,
    homeTownTagPromise,
  ]);

  return (
    <section className="relative flex-col flex w-full justify-center h-full bg-white touch-pan-y">
      <HomeTopSection />
      <HomeSectionTitle title="최신 서울시 정책 NEWS" />
      <YouthList youthList={youthList} />
      <HomeSectionTitle title="서울 주요 장소 인구밀집 현황" />
      <HomePlaceComponent data={placeList as []} />
      <HomeSectionTitle title="주간 TOP 5 커뮤니티 게시글" />
      <DynamicTopFiveSection weekleyTopFivelist={weekleyTopFive} />
      <DynamicReviewSection hotTagReview={hotTagReview} />
      <DynamicMapSection HotTagReview={locationTag} />
      <DynamicHomeHomeTownSection HotTagHomeTown={homeTownTag} />
      <div id="searchPortal" />
      <div id="placePortal" />
    </section>
  );
};
export default HomePage;
