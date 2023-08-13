import Navbar from '@/components/layouts/Navbar';

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <main className="mb-20">{children}</main>
      {/* {sidebar} */}
      <Navbar />
    </section>
  );
}
