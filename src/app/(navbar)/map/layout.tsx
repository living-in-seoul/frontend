export default function NoNavbarLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      {/* {sidebar} */}
    </>
  );
}
