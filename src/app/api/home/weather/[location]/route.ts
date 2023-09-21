import { seoulCenterCoords } from '@/utils/constants/constants';
import { convertToXY, getCurrentDateAndTime } from '@/utils/utilFunc';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { location: string };
}
export const dynamic = 'force-dynamic';
export const runtime = 'edge';
export const GET = async (_: NextRequest, context: Context) => {
  const location = context.params.location as keyof typeof seoulCenterCoords;
  const { getCurrentDate: currentDate, getCurrentTime: currentTime } =
    getCurrentDateAndTime();

  const { lat, lng } = seoulCenterCoords[location]!;
  const { x: nx, y: ny } = convertToXY('toXY', lat, lng);

  const api = `${process.env.NEXT_PUBLIC_WHEADER_URL}?ServiceKey=${process.env.NEXT_PUBLIC_WHEADER_API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${currentDate}&base_time=${currentTime}&nx=${nx}&ny=${ny}`;

  const categories = [
    'LGT',
    'PTY',
    'RN1',
    'SKY',
    'T1H',
    'REH',
    'UUU',
    'VVV',
    'VEC',
    'WSD',
  ];
  const response = await fetch(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 0 },
  }).then<ForecastResponse>((res) => res.json());

  const forecastItems = response.response.body.items.item;
  const currentsTime = parseInt(
    `${new Date().getHours()}${new Date().getMinutes()}`,
  );

  const closestTime = forecastItems.reduce((prev, curr) => {
    const prevDiff = Math.abs(currentsTime - parseInt(prev.fcstTime));
    const currDiff = Math.abs(currentsTime - parseInt(curr.fcstTime));
    return prevDiff < currDiff ? prev : curr;
  }).fcstTime;

  const filteredItems = forecastItems.filter(
    (item) =>
      categories.includes(item.category) && item.fcstTime === closestTime,
  );
  const temperatures = forecastItems
    .filter((item) => item.category === 'T1H')
    .map((item) => item.fcstValue);

  const maxTemperature = Math.max(...temperatures);
  const minTemperature = Math.min(...temperatures);
  const rainAmountItem = forecastItems.find(
    (item) => item.category === 'RN1' && item.fcstTime === closestTime,
  );
  const rainAmount = rainAmountItem ? rainAmountItem.fcstValue : '강수없음';
  const currentTemperatureItem = filteredItems.find(
    (item) => item.category === 'T1H',
  );
  const currentTemperature = currentTemperatureItem
    ? currentTemperatureItem.fcstValue
    : null;
  const humidityItem = forecastItems.find(
    (item) => item.category === 'REH' && item.fcstTime === closestTime,
  );
  const humidity = humidityItem ? humidityItem.fcstValue : null;
  const responseData: ResponseWeather = {
    items: { filteredItems },
    info: {
      temperature: { maxTemperature, minTemperature, currentTemperature },
      humidity,
      rainAmount,
    },
  };

  return NextResponse.json(responseData);
};
