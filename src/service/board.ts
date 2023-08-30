import { cookies } from 'next/headers';

interface ResponsenewDataDataType {
  message: string;
  code: number;
}

/**글쓰기 post */
export const writeBoard = async (form: any) => {
  const token = cookies().get('accessToken');
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/posts`, {
      method: 'POST',
      headers: {
        enctype: 'multipart/form-data',
        authorization: 'Bearer ' + token?.value,
      },
      body: form,
    }).then((response) => response.json());
    return response;
  } catch (error: any) {
    console.log('ehlsmsdfasdfa', error.message);
  }
};

/**postData 가져오기 */
export const getBoard = async (postId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/posts/get/${postId}`,
      {
        next: { tags: ['like'] },
        cache: 'no-store',
      },
    ).then<ResponseDetailData>((res) => res.json());
    return response;
  } catch (error: any) {
    console.log('getBoard error', error.message);
  }
};

/**post scrap하기 */
export const scrapPost = async (postId: string) => {
  const token = cookies().get('accessToken');
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/posts/${postId}/scrap`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token?.value,
        },
      },
    ).then<ResponseDetailData>((res) => res.json());
    return response;
  } catch (error: any) {
    console.log('getBoard error', error.message);
  }
};

/**mypage psot 가져오기 */
export const getMypagePost = async (url: string) => {
  const token = cookies().get('accessToken');
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    next: { revalidate: 0 },
  }).then<ResponseMyPostData>((res) => res.json());
  return response;
};
