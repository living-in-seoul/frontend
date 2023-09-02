import HomeLocationSeclect from '@/components/home/HomeLocationSeclect';
import CommunitySearch from '@/components/community/CommunitySearch';
import CommunityNavbar from '@/components/community/CommunityNavbar';

export default function CommunityLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <section className="relative">
      <div className="relative flex flex-col justify-between w-full pt-14 h-40 bg-neutral-200">
        <div className="flex justify-between">
          <HomeLocationSeclect />
          <CommunitySearch />
        </div>
        <CommunityNavbar />
      </div>
      <div id="searchModal" />
      <div>
        {children}
        {modal}
      </div>
    </section>
  );
}
