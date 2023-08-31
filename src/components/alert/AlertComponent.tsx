import AleratTabSection from './AlertTabSection';
import AlertHeader from './AlertHeader';

const AlertComponent = () => {
  return (
    <section className="relative max-w-md top-0 -translate-x-1/2 left-1/2 flex flex-col justify-center items-center w-full h-screen z-50">
      {/* 알림 헤더 */}
      <div className="relative bg-white w-full h-full max-w-md pt-14 ">
        <AlertHeader />
        <AleratTabSection />
      </div>
    </section>
  );
};
export default AlertComponent;
