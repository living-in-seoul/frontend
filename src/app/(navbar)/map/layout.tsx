import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

export default function NavbarLayout({
  children,
  modal,
  recommend,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  recommend: React.ReactNode;
}) {
  // const pathname = usePathname();
  return (
    <>
      <main className="w-full h-full">
        {children}
        {/* <MapBottomSheet>
            {pathname === '/map' ? recommend : modal}
          </MapBottomSheet> */}
      </main>
    </>
  );
}
