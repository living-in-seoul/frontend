import MapProvider from '@/context/MapProvider';

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative w-full h-full">
      <MapProvider>
        {children}
        <div id="imagePortal" />
        <div id="mapPortal" />
        <div id="confirmPortal" />
      </MapProvider>
    </main>
  );
}
