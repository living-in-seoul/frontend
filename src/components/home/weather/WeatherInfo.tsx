'use client';
import { parseMM } from '@/utils/utilFunc';

interface weatherInfoProps {
  filterinfo: FilteredInfo;
  icon: string;
}
enum IconTypeKr {
  ClearDay = '맑음',
  ClearNight = '저녁',
  Raining = '비옴',
  Windy = '바람',
  PartlyCloudyDay = '구름/낮',
  Thunder = '번개',
  Snowing = '눈옴',
  Cloudy = '흐림',
  Shower = '소나기',
  PartlyCloudyNight = '구름/밤',
}
const WeatherInfo = ({ filterinfo, icon }: weatherInfoProps) => {
  const { humidity, rainAmount, temperature } = filterinfo;
  const description = IconTypeKr[icon as keyof typeof IconTypeKr];

  const WeatherPercent = () => (
    <div className="flex after:border-r after:w-[1px] after:h-full after:pl-5">
      <div className="flex flex-col">
        <div className="text-neutral-500 text-xs font-normal leading-snug">
          {rainAmount}
        </div>
        <div className="text-neutral-700 text-base font-semibold leading-snug">
          {rainAmount === '강수없음'
            ? '0%'
            : `${parseMM(rainAmount.toString())}`}
        </div>
      </div>
    </div>
  );
  const WeatherHumidty = () => (
    <div className="">
      <div className="flex flex-col">
        <div className="text-neutral-500 text-xs font-normal leading-snug">
          습도
        </div>
        <div className="text-neutral-700 text-base font-semibold leading-snug">
          {humidity}%
        </div>
      </div>
    </div>
  );
  const WeatherComponent = () => (
    <div className="flex after:border-r after:w-[1px] after:h-full after:pl-5">
      <div className="flex flex-col">
        <div className="text-neutral-700 text-base font-semibold leading-snug">
          {description} {temperature.currentTemperature}˚
        </div>
        <div className="text-neutral-600 text-xs font-normal leading-snug">
          최고 {temperature.maxTemperature}˚ / 최저 {temperature.minTemperature}
          ˚
        </div>
      </div>
    </div>
  );
  const rain = `${rainAmount + ' / ' + humidity + '% '}`;
  return (
    <div className="flex gap-5 pl-3">
      <WeatherComponent />
      <WeatherPercent />
      <WeatherHumidty />
    </div>
  );
};
export default WeatherInfo;
/** 도시 이미지 가져오기 검색어로 */
