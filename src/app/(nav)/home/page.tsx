import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import HomeTopSection from '@/components/home/HomeTopSection';
import { PlaceCardSkeleton } from '@/components/home/homeplace/HomePlaceCard';
import HomePlaceSection from '@/components/home/homeplace/HomePlaceSection';
import { ArticleSkeleton } from '@/components/youth/YouthItem';
import YouthSection from '@/components/youth/YouthSection';

import { Suspense } from 'react';

const HomePage = () => {
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

      <div id="searchPortal" />
      <div id="placePortal" />
    </section>
  );
};
export default HomePage;
