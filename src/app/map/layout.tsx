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
    <main className="w-full h-full">
      <RecoilRoot>
        {children}
        <DynamicMap />
        <MapBottomSheet>
          <span>hi</span>
        </MapBottomSheet>
      </RecoilRoot>
    </main>
  );
}
