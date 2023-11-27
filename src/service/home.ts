import { categoryKO } from '@/utils/utilFunc';
import { CODES_TYPE } from '@/utils/constants/constants';
import { DATA_AREA } from '@/utils/constants/place';

export const getHomeList = async (
  category: string,
  postType: string | null,
  hashtags: string,
) => {
  if (category !== 'All') {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER
      }/tags/post/category?size=2&page=1&hashtagName=${hashtags}&category=${categoryKO(
        category,
      )}&type=${postType}`,
      { next: { tags: [hashtags] } },
    ).then((res) => res.json());
    return response;
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/posts/get?size=2&page=1`,
    { next: { revalidate: 2000 } },
  ).then((res) => res.json());

  return response;
};
export const getHomeListWithToken = async (
  category: string,
  postType: string | null,
  hashtags: string | null,
  Token: string,
) => {
  if (category !== 'All') {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER
      }/tags/post/category?size=2&page=1&hashtagName=${hashtags}&category=${categoryKO(
        category,
      )}&type=${postType}`,

      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      },
    ).then((res) => res.json());
    return response;
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/posts/like/get?size=10&page=1`,

    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    },
  ).then((res) => res.json());

  return response;
};

export const getHomeReviewPostList = async (hashtags: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/posts?page=1&size=6&hashtagName=${hashtags}&category=후기&type=popular`,
  )
    .then<ResponseRegister>((res) => res.json())
    .then<ResponsePost[]>((res) => res.result);

  return res;
};
export const getHomeHomeTownPostList = async (hashtags: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/posts?page=1&size=6&hashtagName=${hashtags}&category=동향소통&type=popular`,
  )
    .then<ResponseRegister>((res) => res.json())
    .then<ResponsePost[]>((res) => res.result);

  return res;
};

/** 정책 데이터 */
export const getYouth = async () => {
  const xml2js = require('xml2js');
  const parser = new xml2js.Parser();

  const promises = CODES_TYPE.map((code) => {
    const url = `${process.env.NEXT_PUBLIC_YOUTH_URL}openApiVlak=${process.env.NEXT_PUBLIC_YOUTH_API_KEY}&display=1&pageIndex=1&srchPolyBizSecd=003002001&bizTycdSel=${code.code}`;
    return fetch(url, { next: { revalidate: 60 * 60 * 24 } })
      .then((res) => res.text())
      .then((text) => parser.parseStringPromise(text));
  });

  const result = await Promise.allSettled(promises);
  const successfulResults = result
    .filter(
      (res): res is PromiseFulfilledResult<any> => res.status === 'fulfilled',
    )
    .map((res) => res.value.youthPolicyList.youthPolicy);

  return successfulResults;
};

/** 도시 데이터 가져오기 검색어로 */
/** place 도시데이터 */
const fetchCityData = async (
  region: string,
): Promise<ResponseCityData | null> => {
  try {
    const res = await fetch(
      `http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_SEOUL_KEY}/json/citydata_ppltn/1/5/${region}`,
      { next: { revalidate: 3000 } },
    );
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch data for region: ${region}`, error);
    return null;
  }
};

/** place 도시데이터 */
export const getHomeDatas = async () => {
  const cityDataPromises = DATA_AREA.map((region) => fetchCityData(region));

  const cityDataResults = await Promise.allSettled(cityDataPromises);

  function isFulfilled<T>(
    result: PromiseSettledResult<T>,
  ): result is PromiseFulfilledResult<T> {
    return result.status === 'fulfilled';
  }

  return DATA_AREA.map((region, index) => {
    const cityDataResult = cityDataResults[index];
    const cityData = isFulfilled(cityDataResult) ? cityDataResult.value : null;

    return {
      ...cityData?.['SeoulRtd.citydata_ppltn']?.[0],
    };
  });
};

/** Top5 weekely */
export const getHotTagTopFive = async (): Promise<ResponseRegister | Error> => {
  try {
    const weekleyTopFivelist = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/tags/posts?category=&page=1&size=5&hashtagName=&type=popular`,
      // { next: { revalidate: 60 * 60 * 5 } },
    );
    if (!weekleyTopFivelist.ok) {
      throw new Error(`${weekleyTopFivelist.status} 에러`);
    }

    const response: ResponseRegister = await weekleyTopFivelist.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log('error', error);
    throw new Error('error');
  }
};

/** Hottags 리뷰 */
export const getHotTagReview = async (): Promise<string[]> => {
  try {
    const HotTagReview = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/tags/rank?category=후기`,
      { next: { revalidate: 60 * 60 } },
    );

    if (!HotTagReview.ok) {
      throw new Error('서버 네트워크 에러', {
        cause: `${HotTagReview.statusText}`,
      });
    }
    const response: string[] = await HotTagReview.json();
    return response;
  } catch (error) {
    throw new Error('error');
  }
};
/** Hottags 맵 */
export const getHotTagMap = async (): Promise<string[]> => {
  const HotTagReview = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/rank?category=`,
    { next: { revalidate: 60 * 60 * 5 } },
  ).then<string[]>((res) => res.json());

  return HotTagReview;
};
/** Hottags 동향소통 */
export const getHotTagHomeTown = async (): Promise<string[]> => {
  try {
    const HotTagHomeTown = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/tags/rank?category=동향소통`,
      { next: { revalidate: 60 * 60 * 5 } },
    );

    await handleHttpError(HotTagHomeTown);

    const response: string[] = await HotTagHomeTown.json();
    return response;
  } catch (error: any & { cause: string }) {
    console.log('asdasldkasldkasldaks  ', error.toString());
    throw handleError(error as Error);
  }
};
interface HttpErrorInterface {
  status: number;
  defaultMessage?: string;
}

const createHttpError = ({ status, defaultMessage }: HttpErrorInterface) => ({
  status,
  message: defaultMessage || `HTTP 오류! 상태 코드: ${status}`,
});

// HTTP 에러 처리 함수
export const handleHttpError = async (response: Response) => {
  if (!response.ok) {
    const { status } = response;

    switch (status) {
      case 400:
        throw createHttpError({ status, defaultMessage: '잘못된 요청입니다.' });
      case 401:
        throw createHttpError({
          status,
          defaultMessage: '인증에 실패했습니다.',
        });
      case 403:
        throw createHttpError({
          status,
          defaultMessage: '접근이 금지되었습니다.',
        });
      case 404:
        throw createHttpError({
          status,
          defaultMessage: '요청한 리소스를 찾을 수 없습니다.',
        });
      case 500:
        throw createHttpError({
          status,
          defaultMessage: '서버 내부 오류가 발생했습니다.',
        });
      default:
        throw createHttpError({ status });
    }
  }
};

class NetworkError extends Error {
  constructor(message = '네트워크 오류') {
    super(message);
    this.name = 'NetworkError';
  }
}

class HttpError extends Error {
  status: number;

  constructor(status: number, message = 'HTTP 에러') {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

class JsonParsingError extends Error {
  constructor(message = 'JSON 파싱 오류') {
    super(message);
    this.name = 'JsonParsingError';
  }
}

class UnknownError extends Error {
  constructor(message = '알 수 없는 에러') {
    super(message);
    this.name = 'UnknownError';
  }
}

type ErrorHandler<T extends Error> = (error: T) => void;

const handleNetworkError: ErrorHandler<NetworkError> = (error) => {
  // console.error('네트워크 오류:', error.message);
  throw new Error(`네트워크 오류: ${error.message}`);
};

const handleHttpErrors: ErrorHandler<HttpError> = (error) => {
  // console.error(`HTTP 에러 (${error.status}):`, {cause : error.message});
  throw new Error(`HTTP 에러: ${error.message}`);
};

const handleJsonParsingError: ErrorHandler<JsonParsingError> = (error) => {
  // console.error('JSON 파싱 오류:', {cause : error.message});
  throw new Error(`JSON 파싱 오류: ${error.message}`);
};

const handleUnknownError: ErrorHandler<UnknownError> = (error) => {
  // console.error('알 수 없는 에러:', error.message);
  throw new Error(`알 수 없는 에러: ${error.message}`);
};

const handleError = <T extends Error>(error: T): void => {
  if (error instanceof NetworkError) {
    handleNetworkError(error);
  } else if (error instanceof HttpError) {
    handleHttpErrors(error);
  } else if (error instanceof JsonParsingError) {
    handleJsonParsingError(error);
  } else {
    handleUnknownError(error as UnknownError);
  }
};
