import HomeLocationSeclect from './HomeLocationSeclect';
import ProfileComponent from './ProfileComponent';
import dynamic from 'next/dynamic';
import BeatLoader from '../common/Spinner';
import AlertButtonComponent from './AlertButtonComponent';

const DynamicWeatherComponent = dynamic(
  () => import('./weather/WeatherComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="flex w-full justify-center items-center h-16 bg-white rounded-[30px] px-9 py-3">
        <BeatLoader size={10} color="#2DDAB0" />
      </div>
    ),
  },
);

const HomeTopSection = () => {
  return (
    <article className="relative overflow-hidden h-[320px]">
      <div className="absolute top-0 left-1/2 right-0 bottom-0 -translate-x-1/2 bg-primary rounded-bl-[150px] rounded-br-[150px] w-[132%] h-[267px]"></div>
      <div className="relative z-10 flex flex-col w-full h-64">
        <div className="flex justify-between pt-[54px] pb-4 px-1.5">
          <HomeLocationSeclect />
          <div className="flex pr-3.5 items-center justify-center cursor-pointer">
            <AlertButtonComponent link="/alert" />
          </div>
        </div>
        <div className="flex flex-col px-4 gap-6">
          <DynamicWeatherComponent />
          <ProfileComponent />
        </div>
      </div>
    </article>
  );
};
export default HomeTopSection;
