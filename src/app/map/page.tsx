import MapHeader from '@/components/map/header/MapHeader';
import MapOption from '@/components/map/MapOption';

export default function MapPage() {
  return (
    <section className=" w-full h-full relative">
      <MapHeader />
      {/* 삼항연산자로 넣어라 */}
      <MapOption />
      <div id="portal" />
    </section>
  );
}
