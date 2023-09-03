import AlertHeader from '@/components/alert/AlertHeader';

export default function AlertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full max-w-2md h-screen relative pt-14">
      <AlertHeader />
      {children}
    </section>
  );
}
