import HomeLocationSeclect from './HomeLocationSeclect';
import ProfileComponent, { MockProfileComponent } from './ProfileComponent';
import AlertButtonComponent from './AlertButtonComponent';
import Header from '../layouts/Header';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import BeatLoader from '../common/Spinner';
const DynamicWeatherComponent = dynamic(
  () => import('./weather/WeatherComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="flex w-full justify-center items-center h-16 bg-white rounded-[30px] px-[34px]">
        <BeatLoader color="#2DDAB0" size={12} className="z-50" />
      </div>
    ),
  },
);
const HomeTopSection = () => {
  return (
    <article className="relative overflow-hidden h-[320px]">
      <div className="absolute top-0 left-1/2 right-0 bottom-0 -translate-x-1/2 bg-primary rounded-bl-[150px] rounded-br-[150px] w-[132%] h-[267px]"></div>
      <div className="relative z-10 pt-14 pb-4 flex flex-col w-full h-64">
        <Header
          left={<HomeLocationSeclect />}
          right={<AlertButtonComponent link="/alert" />}
        />

        <div className="flex flex-col px-4 gap-6">
          <Suspense fallback={<>loading...</>}>
            <DynamicWeatherComponent />
          </Suspense>

          <Suspense fallback={<MockProfileComponent />}>
            <ProfileComponent />
          </Suspense>
        </div>
      </div>
    </article>
  );
};
export default HomeTopSection;
