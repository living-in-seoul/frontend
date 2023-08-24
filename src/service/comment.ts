/**댓글 달기 POST */
import { cookies } from 'next/headers';

const token = cookies().get('accessToken');
export const postComment = async (data: RequestCommentPost) => {
  console.log(token);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/oauth/login`,
    {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    },
  )
    .then((response) => response.json())
    .catch((error) => error.response);
  return response;
};
