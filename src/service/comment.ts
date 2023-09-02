import { cpSync } from 'fs';
import { cookies } from 'next/headers';

/**CommentData 가져오기 */
export const getComment = async (postId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/comment/get/${postId}?page=1&size=3`,
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
/**추가 CommentData 가져오기 */
export const getMoreComment = async (postId: string, page: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/comment/get/${postId}?page=${page}&size=3`,
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

/**대댓글 달기 POST */
export const rePostComment = async (body: string, commentId: string) => {
  const token = cookies().get('accessToken');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/comment/re/${commentId}`,
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

/**대댓글 수정 PUT */
export const putReComment = async (body: string, reCommentId: string) => {
  const token = cookies().get('accessToken');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/comment/re/${reCommentId}`,
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

/**대댓글 삭제 DELETE */
export const deleteReComment = async (reCommentId: string) => {
  const token = cookies().get('accessToken');
  console.log('첫번째', reCommentId);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/comment/re/${reCommentId}`,
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
/**포스트 스크랩 */
export const setDetailScrap = async (postId: string) => {
  const token = cookies().get('accessToken');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/posts/${postId}/scrap`,
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

/** 댓글 좋아요 POST */
export const setCommentLike = async (commentId: string) => {
  const token = cookies().get('accessToken');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/comment/${commentId}/like`,
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
