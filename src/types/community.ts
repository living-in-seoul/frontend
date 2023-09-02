type SelectPopType = 'newer' | 'popular';

type ConversionType = 'toXY' | 'toLL';

interface ConversionResult {
  x?: number;
  y?: number;
  lat?: number;
  lng?: number;
}
type category =
  | 'LGT'
  | 'PTY'
  | 'RN1'
  | 'SKY'
  | 'T1H'
  | 'REH'
  | 'UUU'
  | 'VVV'
  | 'VEC'
  | 'WSD';
interface ForecastItem {
  baseDate: string;
  baseTime: string;
  category: category;
  fcstDate: string;
  fcstTime: string;
  fcstValue: number; // 예상되는 값의 유형에 따라 수정할 수 있습니다.
  nx: number;
  ny: number;
}
interface ForecastBody {
  dataType?: never; // 해당 필드가 없을 경우 에러 발생
  items: { item: ForecastItem[] };
  pageNo?: number;
  numOfRows?: number;
  totalCount?: number;
}
interface ForecastResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: ForecastBody;
  };
}
type IconType =
  | 'ClearDay'
  | 'ClearNight'
  | 'Raining'
  | 'Windy'
  | 'PartlyCloudyDay'
  | 'Thunder'
  | 'Snowing'
  | 'Cloudy'
  | 'Shower'
  | 'PartlyCloudyNight';
interface IconPositions {
  x: number;
  y: number;
}

type IconConfigType = {
  [key in IconType]?: IconPositions;
};

type PCPValue =
  | '강수없음'
  | '0.1 ~ 1.0mm 미만'
  | '1.0mm 미만'
  | `${number}mm` // 1.0mm 이상 30.0mm 미만의 실수값
  | '30.0~50.0mm'
  | '50.0mm 이상';

interface ResponseWeather {
  items: FilteredItems;
  info: FilteredInfo;
}

interface FilteredItems {
  filteredItems: ForecastItem[];
}
interface FilteredInfo {
  temperature: WeatherTemperature;
  rainAmount: string | number;
  humidity: number | null;
}

interface WeatherTemperature {
  maxTemperature: number;
  minTemperature: number;
  currentTemperature: number | null;
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

type HowdayType = '~6개월' | '1~2년' | '3~4년' | '5년 이상' | 'null';
