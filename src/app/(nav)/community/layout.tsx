import HomeLocationSeclect from '@/components/home/HomeLocationSeclect';
import CommunitySearch from '@/components/community/CommunitySearch';
import CommunityNavbar from '@/components/community/CommunityNavbar';
import Header from '@/components/layouts/Header';
import { Suspense } from 'react';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative">
      <div className="relative flex flex-col justify-between w-full pt-14 h-40 bg-white">
        <Header
          left={<HomeLocationSeclect onCommunity={true} />}
          right={<CommunitySearch />}
        />
        <CommunityNavbar />
      </div>

      <Suspense fallback={<>loading...</>}>{children}</Suspense>
    </section>
  );
}
