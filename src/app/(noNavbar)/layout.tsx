export default function NoNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>NoNavbarLayout</h1>
      {children}
    </>
  );
}
