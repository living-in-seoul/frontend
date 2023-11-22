import { categoryKO } from '@/utils/utilFunc';
import { CODES_TYPE } from '@/utils/constants/constants';
import { DATA_AREA } from '@/utils/constants/place';
import exampleData from '@/utils/constants/mock.test';

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
      { next: { revalidate: 60 * 60 * 5 } },
    );

    const response: ResponseRegister = await weekleyTopFivelist.json();

    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // return exampleData;

    return response;
  } catch (error) {}
  throw new Error('network error');
};

/** Hottags 리뷰 */
export const getHotTagReview = async (): Promise<string[]> => {
  const HotTagReview = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/rank?category=후기`,
    { next: { revalidate: 60 * 60 } },
  ).then<string[]>((res) => res.json());

  return HotTagReview;
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
  const HotTagHomeTown = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/rank?category=동향소통`,
    { next: { revalidate: 60 * 60 * 5 } },
  ).then<string[]>((res) => res.json());

  return HotTagHomeTown;
};
