'use client';
import MapBottomSheet from '@/components/map/bottomsheet/MapBottomSheet';
import { usePathname, useSearchParams } from 'next/navigation';
import { RecoilRoot } from 'recoil';
import dynamic from 'next/dynamic';

export default function NavbarLayout({
  children,
  isolation,
  recommend,
}: {
  children: React.ReactNode;
  isolation: React.ReactNode;
  recommend: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const search = searchParams.get('search');
  // 리코일 set

  return (
    <main className="w-full h-full">
      <RecoilRoot>
        {children}

        <MapBottomSheet>
          {pathname === '/map' ? recommend : isolation}
        </MapBottomSheet>
      </RecoilRoot>
    </main>
  );
}
