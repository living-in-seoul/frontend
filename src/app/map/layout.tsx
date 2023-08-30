import BottomSheet from '@/components/BottomSheet';
import ActionButtons from '@/components/map/actions/ActionButtons';
import MapBottomSheet from '@/components/map/bottomsheet/MapBottomSheet';
import BottomSheetOption from '@/components/map/BottomSheetOption';
import MapHeader from '@/components/map/header/MapHeader';
import MapProvider from '@/context/MapProvider';

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full max-w-md h-screen relative">
      <MapHeader />
      <MapProvider>{children}</MapProvider>
      {/* <MapBottomSheet> */}
      <BottomSheetOption />
      {/* </MapBottomSheet> */}
      <ActionButtons />
    </section>
  );
}
