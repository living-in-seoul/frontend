import { categoryKO } from '@/utils/utilFunc';

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
    `${process.env.NEXT_PUBLIC_SERVER}/tags/post/category?page=1&size=6&hashtagName=${hashtags}&category=후기&type=popular`,
  )
    .then<ResponseRegister>((res) => res.json())
    .then<ResponsePost[]>((res) => res.result);

  return res;
};
export const getHomeHomeTownPostList = async (hashtags: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/post/category?page=1&size=6&hashtagName=${hashtags}&category=동향소통&type=popular`,
  )
    .then<ResponseRegister>((res) => res.json())
    .then<ResponsePost[]>((res) => res.result);

  return res;
};
