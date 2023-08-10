import Navbar from '@/components/layouts/Navbar';

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="mb-20">{children}</main>
      <Navbar />
    </>
  );
}
