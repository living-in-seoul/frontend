import dynamic from 'next/dynamic';
import Map from '../../../components/map/Map';
const DynamicMap = dynamic(() => import('../../../components/map/Map'), {
  ssr: true,
});

const MapPage = () => {
  return (
    <section className=" w-full h-full">
      <DynamicMap />
    </section>
  );
};
export default MapPage;
