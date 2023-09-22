import AleratTabSection from '@/components/alert/AlertTabSection';

const AlertPage = () => {
  return (
    <section className="relative max-w-md top-0 -translate-x-1/2 left-1/2 flex flex-col justify-center items-center w-full h-screen z-50">
      <div className="relative bg-white w-full h-full max-w-md">
        <AleratTabSection />
      </div>
    </section>
  );
};
export default AlertPage;
