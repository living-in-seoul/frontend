'use client';

import MapBottomSheet from '@/components/map/bottomsheet/MapBottomSheet';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { RecoilRoot } from 'recoil';

export default function NavbarLayout({
  children,
  modal,
  recommend,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  recommend: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <>
      <main className="w-full h-full">
        <RecoilRoot>
          {children}
          <MapBottomSheet>
            {pathname === '/map' ? recommend : modal}
          </MapBottomSheet>
        </RecoilRoot>
      </main>
    </>
  );
}
