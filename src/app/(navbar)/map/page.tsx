import Map from '@/components/map/Map';
import MapBottomSheet from '@/components/map/MapBottomSheet';
import dynamic from 'next/dynamic';
const DynamicMap = dynamic(() => import('../../../components/map/Map'), {
  ssr: false,
});

const MapPage = () => {
  return (
    <section className=" w-full h-full">
      <DynamicMap />
    </section>
  );
};

export default MapPage;
