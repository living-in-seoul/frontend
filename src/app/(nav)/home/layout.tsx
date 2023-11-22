import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Seoul vival에 오신것을 환영합니다 ㅎㅎㅎ',
  description: '서울시 각구 사람들이 모여 소통하는 공간입니다',
  appleWebApp: {
    statusBarStyle: 'black',
  },
  viewport: {
    // width
  },
};
export default function HomeLayout({
  children,
  review,
  popular,
  hometown,
  hottag,
}: {
  children: ReactNode;
  review: ReactNode;
  popular: ReactNode;
  hometown: ReactNode;
  hottag: ReactNode;
}) {
  return (
    <section
      className={`relative flex-col flex w-full justify-center h-full bg-white touch-pan-y`}
    >
      {children}
      <HomeSectionTitle title="주간 TOP 5 커뮤니티 게시글" />
      {hottag}
      <HomeSectionTitle
        title="이웃이 남긴 후기를 살펴보세요"
        link="/community?category=review"
      />
      {review}
      <HomeSectionTitle title="해시태그 언급이 잦은 장소에요" link="/map" />
      {popular}
      <HomeSectionTitle
        title="동향 사람들과 소통해 보세요"
        link="/community?category=communication"
      />
      {hometown}
    </section>
  );
}
