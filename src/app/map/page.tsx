import CommunityMap from '@/components/map/CommunityMap';

export default function MapPage() {
  return (
    <section className="w-full h-full absolute top-0 z-0">
      <CommunityMap />
      <div id="portal" />
    </section>
  );
}
