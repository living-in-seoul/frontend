import Navbar from '@/components/layouts/Navbar';

export default function NavbarLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <main className="mb-[60px]">{children}</main>
      <Navbar />
    </>
  );
}
