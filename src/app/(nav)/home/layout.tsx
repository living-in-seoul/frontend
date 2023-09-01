export default function NavbarLayout({
  children,
  hometown,
  youth,
  popular,
  hottag,
  review,
}: {
  children: React.ReactNode;
  hometown: React.ReactNode;
  youth: React.ReactNode;
  hottag: React.ReactNode;
  popular: React.ReactNode;
  review: React.ReactNode;
}) {
  return (
    <section
      className={`relative flex-col flex w-full justify-center h-full bg-white touch-pan-y`}
    >
      {children}
      {youth}
      {hottag}
      {review}
      {popular}
      {hometown}
    </section>
  );
}
