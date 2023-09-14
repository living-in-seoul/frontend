'use client';
import useSWR from 'swr';
import WeatherIcon from './WeatherIcon';
import WeatherInfo from './WeatherInfo';
import { getCurrentWeather } from '@/utils/utilFunc';
import { useRecoilValue } from 'recoil';
import { SearchGuState } from '@/recoil/homeState';

const WeatherComponent = () => {
  const serachGu = useRecoilValue(SearchGuState);
  const { data: weather } = useSWR<ResponseWeather>(
    `/api/home/weather/${serachGu}`,
    { suspense: true, revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  const icon = weather
    ? getCurrentWeather(weather?.items.filteredItems)
    : '맑음';
  //loading
  return (
    <div>
      {weather && (
        <>
          <div className="flex w-full justify-center h-16 bg-white rounded-[30px] py-3 px-[34px]">
            <WeatherIcon icon={icon} />
            <WeatherInfo filterinfo={weather.info} icon={icon} />
          </div>
        </>
      )}
    </div>
  );
};
export default WeatherComponent;
