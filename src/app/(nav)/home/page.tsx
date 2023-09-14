import HomeTopSection from '@/components/home/HomeTopSection';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const HomePage = () => {
  return (
    <section className="relative h-full">
      <HomeTopSection />
      <div id="searchPortal" />
      <div id="placePortal" />
    </section>
  );
};
export default HomePage;
