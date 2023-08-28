import { cookies } from 'next/headers';

interface ResponseDataType {
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
      `https://seoulvival.com:8080/posts/get/${postId}`,
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

/**CommentData 가져오기 */
export const getComment = async (postId: string) => {
  try {
    const response = await fetch(
      `https://seoulvival.com:8080/comment/get/${postId}?page=1&size=3`,
      {
        next: { tags: ['like'] },
        cache: 'no-store',
      },
    ).then<ResponseCommentData>((res) => res.json());
    return response;
  } catch (error: any) {
    console.log('getBoard error', error.message);
  }
};
