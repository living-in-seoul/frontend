export default function NoNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen px-4 flex flex-col gap-10 pb-4  ">
      {children}
    </main>
  );
}
