'use client';
import dynamic from 'next/dynamic';
import PlacesAutoComplete from '@/components/map/search/PlacesAutoComplete';
import { RecoilRoot } from 'recoil';
const DynamicMap = dynamic(() => import('../../../components/map/Map'), {
  ssr: false,
  loading: () => <div>...로딩</div>,
});

const MapPage = () => {
  return (
    <RecoilRoot>
      <section className=" w-full h-full">
        <PlacesAutoComplete />
        <DynamicMap />
      </section>
    </RecoilRoot>
  );
};
export default MapPage;
