import dynamic from 'next/dynamic';
import PlacesAutoComplete from '@/components/map/search/PlacesAutoComplete';
const DynamicMap = dynamic(() => import('../../../components/map/Map'), {
  ssr: true,
});

const MapPage = () => {
  return (
    <section className=" w-full h-full">
      <PlacesAutoComplete />
      <DynamicMap />
    </section>
  );
};
export default MapPage;
