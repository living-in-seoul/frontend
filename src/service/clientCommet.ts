export const clientCommentLike = async (
  commentId: number,
  type: 'detail' | 'comment' | 'recomment',
) => {
  const fetchUrl = () => {
    switch (type) {
      case 'detail':
        return '/api/post/like';
      case 'comment':
        return '/api/comment/like';
      case 'recomment':
        return '/api/comment/re/like';
    }
  };
  const response = await fetch(fetchUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentId),
  }).then((respnse) => respnse.json());
  return response;
};

export const clientCommentDelete = async (
  commentId: number,
  recomment?: boolean,
) => {
  const fetchUrl = recomment
    ? `/api/comment/re/${commentId}`
    : `/api/comment/${commentId}`;
  await fetch(fetchUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

export const clientPostScrap = async (postId: number) => {
  const response = await fetch(`/api/post/scrap`, {
    method: 'POST',
    body: JSON.stringify(postId),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 401) {
      document.body.style.overflow = 'hidden';
    } else {
      throw new Error(response.statusText);
    }
  });
  return response;
};
