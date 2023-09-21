import { seoulCenterCoords } from '@/utils/constants/constants';
import {
  convertToXY,
  filterItemsByTimeAndCategory,
  getClosestTime,
  getCurrentDateAndTime,
  getSpecificItemValue,
  getTemperatureDetails,
} from '@/utils/utilFunc';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { location: string };
}

const fetchWeatherData = async (api: string) => {
  const response = await fetch(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const GET = async (req: NextRequest, context: Context) => {
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
  const closestTime = getClosestTime(forecastItems, currentsTime);

  const filteredItems = filterItemsByTimeAndCategory(
    forecastItems,
    closestTime,
  );
  const { maxTemperature, minTemperature, currentTemperature } =
    getTemperatureDetails(forecastItems);
  const rainAmount =
    getSpecificItemValue(forecastItems, 'RN1', closestTime) || '강수없음';
  const humidity = getSpecificItemValue(forecastItems, 'REH', closestTime);

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
