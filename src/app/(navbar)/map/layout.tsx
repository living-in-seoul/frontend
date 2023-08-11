import MapBottomSheet from '@/components/map/MapBottomSheet';

export default function NoNavbarLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  console.log(modal);
  return (
    <>
      <main className="w-full h-full">
        {children}
        <MapBottomSheet>{modal}</MapBottomSheet>
      </main>
    </>
  );
}
