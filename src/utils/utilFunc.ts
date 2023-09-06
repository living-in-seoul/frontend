import { seoulCenterCoords } from './constants/constants';

/**요청 재시도 */
export async function retryFetch(
  url: string,
  options: any,
  maxAttempts = 3,
  delay = 1000,
): Promise<Response> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url, options);
      if (response.status !== 429) {
        return response;
      }
    } catch (err) {}
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  throw new Error('너무 많은 요청');
}

/** 이미지 가져오기 */
export const getImageSrc = (code: string) => {
  const ImageSrc = `${process.env.NEXT_PUBLIC_GOOGLE_PHOTO_URL}?maxwidth=400&maxheigth=800&photo_reference=${code}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
  return ImageSrc;
};

/** 자바 날짜 바꾸기 */
const convertToJSDate = (javaDate: string): Date => {
  const dateWithoutMicroseconds = javaDate.slice(0, 23);
  const date = new Date(dateWithoutMicroseconds);
  date.setHours(date.getHours());
  return date;
};

export const getTimeAgo = (javaDate: string): string => {
  const date = convertToJSDate(javaDate);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return `${seconds}초 전`;
};

/** 카테고리 한글화 */
export const categoryKO = (category: string) => {
  switch (category) {
    case 'communication':
      return '동향소통';
    case 'review':
      return '후기';
    case 'Life':
      return '생활정보';
    default:
      return category;
  }
};

/** 카테고리 영어화 */
export const categoryEN = (category: string) => {
  switch (category) {
    case '동향소통':
      return 'communication';
    case '후기':
      return 'review';
    case '생활정보':
      return 'Life';
    default:
      return category;
  }
};

// 쿠키 와 와이어샤크 : 구글 브라우저의 네트워크 탭에 보이는 여러 응답값이 있는데
// 이 프로그램을 사용하면 더 자세하게 그에 대해서 알 수 있다
//

//s3를 사용한 이유는 시간여유가 없던 것에 의해서 이미지 호스팅을 함
// 보일러 플레이트가 생각보다 크지 않고 그것을 통해서 클라이언트에서 핸들링해서
// 부담이 덜 간다

/**
 * 로컬스토리지 중복검사
 * 키 수정
 * @param newSearch 파라미터 중복검사값
 */
export const addRecentlySearched = (newSearch: string) => {
  const storedSearch = JSON.parse(
    localStorage.getItem('recentlySearched') || '[]',
  );

  if (!storedSearch.includes(newSearch) && newSearch === '#') {
    const updatedSearch = [...storedSearch, newSearch];
    localStorage.setItem('recentlySearched', JSON.stringify(updatedSearch));
  }
};

export function deepEqual(obj1: any, obj2: any) {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

const CONSTANTS = {
  RE: 6371.00877,
  GRID: 5.0,
  SLAT1: 30.0,
  SLAT2: 60.0,
  OLON: 126.0,
  OLAT: 38.0,
  XO: 43,
  YO: 136,
};

/**
 *
 * @param code "toXY" 를쓰면 XY를 경도위도로 바꿔줌
 * @param v1 경도
 * @param v2 위도
 * @returns 경도위도가 튀어나옴
 */
export const convertToXY = (
  code: ConversionType,
  v1: number,
  v2: number,
): ConversionResult => {
  const DEGRAD = Math.PI / 180.0;
  const RADDEG = 180.0 / Math.PI;

  const { RE, GRID, SLAT1, SLAT2, OLON, OLAT, XO, YO } = CONSTANTS;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  const sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  const sf =
    (Math.pow(Math.tan(Math.PI * 0.25 + slat1 * 0.5), sn) * Math.cos(slat1)) /
    sn;
  const ro = (re * sf) / Math.pow(Math.tan(Math.PI * 0.25 + olat * 0.5), sn);

  let result: ConversionResult = {};

  if (code === 'toXY') {
    const ra =
      (re * sf) / Math.pow(Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5), sn);
    let theta = v2 * DEGRAD - olon;
    theta *= sn;

    result.x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    result.y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  } else {
    const xn = v1 - XO;
    const yn = ro - v2 + YO;
    const ra = Math.sqrt(xn * xn + yn * yn);

    let alat =
      2.0 * Math.atan(Math.pow((re * sf) / ra, 1.0 / sn)) - Math.PI * 0.5;
    let theta =
      Math.abs(yn) <= 0.0
        ? xn < 0.0
          ? -Math.PI * 0.5
          : Math.PI * 0.5
        : Math.atan2(xn, yn);

    result.lat = alat * RADDEG;
    result.lng = theta / sn + OLON * DEGRAD;
  }

  return result;
};

/** 년도월일 */
export const getCurrentDateAndTime = () => {
  let now = new Date();
  now.setHours(now.getHours() - 3); // 3시간을 뺍니다.

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');

  return {
    getCurrentTime: `${hour}00`, // 정시로 설정합니다.
    getCurrentDate: `${year}${month}${day}`,
  };
};

export const getCurrentWeather = (filteredItems: ForecastItem[]) => {
  const ptyValue =
    filteredItems
      .find((item) => item.category === 'PTY')
      ?.fcstValue?.toString() || '0';
  const rn1Value =
    filteredItems
      .find((item) => item.category === 'RN1')
      ?.fcstValue?.toString() || '0';
  const wsdValue = parseFloat(
    filteredItems
      .find((item) => item.category === 'WSD')
      ?.fcstValue?.toString() || '0',
  );
  const skyValue =
    filteredItems
      .find((item) => item.category === 'SKY')
      ?.fcstValue?.toString() || '1'; // 맑음을 기본값으로 설정
  const lgtValue =
    filteredItems.find((item) => item.category === 'LGT')?.fcstValue || false; // 낙뢰 없음을 기본값으로 설정

  const baseTime = parseInt(filteredItems[0].baseTime);

  let icon = '';

  if (ptyValue === '3') {
    icon = 'Snowing';
  } else if (lgtValue !== false && lgtValue > 0) {
    icon = 'Thunder';
  } else if (skyValue === '3') {
    if (baseTime >= 1800 || baseTime < 600) {
      icon = 'PartlyCloudyNight';
    } else {
      icon = 'PartlyCloudyDay';
    }
  } else if (skyValue === '4') {
    icon = 'Cloudy';
  } else if (ptyValue === '1' || ptyValue === '5' /* RainDrop */) {
    icon = 'Raining';
  } else if (ptyValue === '2' || ptyValue === '6' /* RainDropSnow */) {
    icon = 'RainingSnow';
  } else if (ptyValue === '4') {
    icon = 'Shower';
  } else if (wsdValue > 3) {
    icon = 'Windy';
  } else {
    if (baseTime >= 1800 || baseTime < 600) {
      icon = 'ClearNight';
    } else {
      icon = 'ClearDay';
    }
  }

  return icon;
};

export const parseMM = (value: string): string => {
  if (value === '1.0mm 미만') {
    return '1.0mm';
  } else if (value.includes('실수값+mm')) {
    // 실수 값만을 추출합니다.
    const matched = value.match(/(\d+\.\d+)mm/);
    return matched ? matched[0] : 'Unknown'; // 만약 정규식이 매치하지 않는 경우 Unknown 반환
  } else if (value === '50.0mm 이상') {
    return '50.0mm';
  } else {
    return value; // 이미 mm 형식인 "30.0~50.0mm" 같은 경우에는 그대로 반환
  }
};

interface FromDataObject {
  [key: string]: any;
}

/** polygon 경계면 띄울 때 데이터 형식 변환하기 (배열 -> 객체로) */
export const transformCoordinates = (
  coords: number[][],
): google.maps.LatLngLiteral[] => {
  return coords?.map((coordPair) => ({
    lat: coordPair[1],
    lng: coordPair[0],
  }));
};
