import MapBottomSheet from '@/components/map/bottomsheet/MapBottomSheet';
import MapProvider from '@/context/MapProvider';

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full max-w-md h-screen relative">
      <MapProvider>
        {children}
        <MapBottomSheet>
          <span>hi</span>
        </MapBottomSheet>
      </MapProvider>
    </section>
  );
}
