import MapProvider from '@/context/MapProvider';

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full">
      <MapProvider>
        {children}
        <div id="imagePortal" />
        <div id="mapPortal" />
      </MapProvider>
    </main>
  );
}
