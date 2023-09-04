import ActionButtons from '@/components/map/actions/ActionButtons';
import MapHeader from '@/components/map/header/MapHeader';
import MapProvider from '@/context/MapProvider';

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full max-w-2md h-screen relative">
      <MapHeader />
      <MapProvider>{children}</MapProvider>
      {/* <BottomSheetOption /> */}
      <ActionButtons />
    </section>
  );
}
