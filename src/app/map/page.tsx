import MapHeader from '@/components/map/header/MapHeader';
import MapOption from '@/components/map/MapOption';

export default function MapPage() {
  return (
    <section className=" w-full h-full relative">
      <MapHeader />
      <MapOption />
      <div id="portal" />
    </section>
  );
}
