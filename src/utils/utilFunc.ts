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

export const DetailNewData = (data: ResponseDetailData) => {
  const headerData = { category: data.result.post.category };
  const maintag = data.result.post.hashtag.split('#').filter((tag) => tag)[0];
  const mainData = {
    nickname: data.result.user.nickname,
    hasLiked: data.result.hasLiked,
    ...data.result.post,
  };
  const hotTagData = {
    tag: maintag,
    category: data.result.post.category,
  };
  const newData = { headerData, mainData, hotTagData };
  return newData;
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

  if (!storedSearch.includes(newSearch)) {
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
