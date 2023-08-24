import ActionButtons from '@/components/map/actions/ActionButtons';
import MapBottomSheet from '@/components/map/bottomsheet/MapBottomSheet';
import BottomSheetOption from '@/components/map/BottomSheetOption';
import MapProvider from '@/context/MapProvider';

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full max-w-md h-screen relative">
      <MapProvider>
        {children}
        <MapBottomSheet>
          <BottomSheetOption />
        </MapBottomSheet>
        <ActionButtons />
      </MapProvider>
    </section>
  );
}
