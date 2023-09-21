import { Metadata } from 'next';

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
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={`relative flex-col flex w-full justify-center h-full bg-white touch-pan-y`}
    >
      {children}
      {/* {youth}
      {place}
      {hottag}
      {review}
      {popular}
      {hometown} */}
    </section>
  );
}
