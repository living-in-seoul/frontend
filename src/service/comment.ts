/**댓글 달기 POST */
import { cookies } from 'next/headers';

export const postComment = async (body: string, postId: string) => {
  const token = cookies().get('accessToken');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/comment/${postId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token?.value,
      },
      body: JSON.stringify(body),
    },
  )
    .then((response) => response.json())
    .catch((error) => error.response);
  return response;
};

export const setDetailLike = async (postId: string) => {
  const token = cookies().get('accessToken');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/posts/${postId}/like`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token?.value,
      },
    },
  )
    .then((response) => response.json())
    .catch((error) => error.response);
  return response;
};
