import Navbar from '@/components/layouts/Navbar';

export default function NavbarLayout({
  children,
  hometown,
  popular,
  hottag,
  review,
}: {
  children: React.ReactNode;
  hometown: React.ReactNode;
  hottag: React.ReactNode;
  popular: React.ReactNode;
  review: React.ReactNode;
}) {
  return (
    <section
      className={`relative flex-col flex w-full justify-center h-full bg-white touch-pan-y`}
    >
      {children}
      {hottag}
      {review}
      {popular}
      {hometown}
    </section>
  );
}
