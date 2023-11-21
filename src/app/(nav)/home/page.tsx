import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import HomeTopSection from '@/components/home/HomeTopSection';
import { PlaceCardSkeleton } from '@/components/home/homeplace/HomePlaceCard';
import HomePlaceComponent from '@/components/home/homeplace/HomePlaceComponent';
import HomePlaceSection from '@/components/home/homeplace/HomePlaceSection';
import TopFiveSection from '@/components/home/topfive/TopFiveSection';
import { ArticleSkeleton } from '@/components/youth/YouthItem';
import YouthList from '@/components/youth/YouthList';
import YouthSection from '@/components/youth/YouthSection';
import {
  getHomeDatas,
  getHotTagHomeTown,
  getHotTagMap,
  getHotTagReview,
  getHotTagTopFive,
  getYouth,
} from '@/service/home';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicTopFiveSection = dynamic(
  () => import('@/components/home/HomeWeekleyTopFive'),
  { loading: () => <>loading...</> },
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
  const [
    // weekleyTopFive,
    // locationTag,
    // homeTownTag,
  ] = await Promise.all([
    // weekleyTopFivePromise,
    // locationTagPromise,
    // homeTownTagPromise,
  ]);

  return (
    <section className="relative flex-col flex w-full justify-center h-full bg-white touch-pan-y">
      <HomeTopSection />

      <HomeSectionTitle title="최신 서울시 정책 NEWS" />

      <Suspense fallback={<ArticleSkeleton />}>
        <YouthSection />
      </Suspense>

      <HomeSectionTitle title="서울 주요 장소 인구밀집 현황" />
      <Suspense fallback={<PlaceCardSkeleton />}>
        <HomePlaceSection />
      </Suspense>

      <HomeSectionTitle title="주간 TOP 5 커뮤니티 게시글" />
      {/* <Suspense fallback={<>loading...</>}>
        <TopFiveSection />
      </Suspense> */}

      <div id="searchPortal" />
      <div id="placePortal" />
    </section>
  );
};
export default HomePage;
