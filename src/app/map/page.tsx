import CommunityMap from '@/components/map/CommunityMap';

export default function MapPage() {
  return (
    <section className=" w-full h-full relative">
      <CommunityMap />
      <div id="portal" />
    </section>
  );
}
