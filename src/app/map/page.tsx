import MapHeader from '@/components/map/MapHeader';
import Map from '@/components/map/Map';
import dynamic from 'next/dynamic';
import { LoadScriptNext } from '@react-google-maps/api';
import { googleMapsLibraries } from '@/utils/constants/constants';

const DynamicMap = dynamic(() => import('../../components/map/Map'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const MapPage = () => {
  return (
    <section className=" w-full h-full relative">
      <MapHeader />
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}
        loadingElement={<div>Loading...</div>}
        libraries={googleMapsLibraries}
      >
        <DynamicMap />
      </LoadScriptNext>
      <div id="portal" />
      <div id="markerPortal" />
    </section>
  );
};
export default MapPage;
