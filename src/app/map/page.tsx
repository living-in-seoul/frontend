import MapHeader from '@/components/map/MapHeader';
import Map from '../../components/map/Map';

const MapPage = () => {
  return (
    <section className=" w-full h-full relative">
      <MapHeader />
      <Map />
      <div id="portal" />
    </section>
  );
};
export default MapPage;
