import Navbar from '@/components/layouts/Navbar';

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>NavbarLayout</h1>
      {children}
      <Navbar />
    </>
  );
}
