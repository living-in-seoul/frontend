import HomeLocationSeclect from '@/components/home/HomeLocationSeclect';
import CommunitySearch from '@/components/community/CommunitySearch';
import CommunityNavbar from '@/components/community/CommunityNavbar';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative">
      <div className="relative flex flex-col justify-between w-full pt-14 h-40 bg-white">
        <div className="flex justify-between">
          <HomeLocationSeclect onCommunity={true} />
          <CommunitySearch />
        </div>
        <CommunityNavbar />
      </div>

      <div>{children}</div>
    </section>
  );
}
