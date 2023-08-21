'use client';
import MapBottomSheet from '@/components/map/bottomsheet/MapBottomSheet';
import { RecoilRoot } from 'recoil';
import dynamic from 'next/dynamic';
import Loading from '../loading';

const DynamicMap = dynamic(() => import('../../components/map/Map'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full max-w-md h-screen relative">
      <RecoilRoot>
        {children}
        <MapBottomSheet>
          <span>hi</span>
        </MapBottomSheet>
      </RecoilRoot>
    </section>
  );
}
