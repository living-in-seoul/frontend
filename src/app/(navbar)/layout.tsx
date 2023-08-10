import Navbar from '@/components/layouts/Navbar';

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="h-full w-full">{children}</div>
      <Navbar />
    </section>
  );
}
