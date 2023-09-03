import { NextRequest, NextResponse } from 'next/server';
export const POST = async (req: NextRequest) => {
  const { postId } = await req.json();
  const Token = req.cookies.get('accessToken')?.value;
  if (!Token) {
    return new Response('로그인을 해야합니다!', { status: 401 });
  }
  if (postId === undefined) {
    return new Response('잘못된 요청입니다!', { status: 400 });
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/posts/${postId}/like`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    },
  ).then((res) => res.json());
  return NextResponse.json(res.message);
};
