import HomeTopSection from '@/components/home/HomeTopSection';

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
