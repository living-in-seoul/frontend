export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full">
      {children}
      <div id="imagePortal" />
    </main>
  );
}
