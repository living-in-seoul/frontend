import { cookies } from 'next/headers';
/**댓글 달기 POST */
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
/**댓글 수정 PUT */
export const putComment = async (body: string, commentId: string) => {
  const token = cookies().get('accessToken');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/comment/${commentId}`,
    {
      method: 'PUT',
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
/**댓글 삭제 DELETE */
export const deleteComment = async (commentId: string) => {
  const token = cookies().get('accessToken');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/comment/${commentId}`,
    {
      method: 'DELETE',
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

/** 포스트 좋아요 POST */
export const setDetailLike = async (postId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/posts/${postId}/like`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((response) => response.json())
    .catch((error) => error.response);
  return response;
};
