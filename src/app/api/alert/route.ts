import { verifyAndRefreshToken } from '@/service/token';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const Token = cookies().get('accessToken');
  const verify = await verifyAndRefreshToken();
  console.log('asdfasfasfsafd', verify.json());
  if (verify.status === 403) {
    return new Response('토큰 없음', { status: 403 });
  } else if (verify.status === 200 || verify.status === 201) {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/alarm/hashtag`,
        {
          next: { revalidate: 0 },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
          },
        },
      ).then((res) => res.json());

      return NextResponse.json(data);
    } catch (error) {
      console.log('에러발생', error);
    }
  }
};
export const POST = async (req: NextRequest) => {
  const verify = await verifyAndRefreshToken();
  const body = await req.json();

  if (verify.status === 403) {
    return new Response('토큰 없음', { status: 403 });
  } else if (verify.status === 200 || verify.status === 201) {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/alarm/hashtag`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${verify.json()}`,
          },
          body: JSON.stringify(body),
        },
      ).then((res) => res.json());
      return NextResponse.json(data);
    } catch (error) {
      console.log('에러발생', error);
    }
  }
};
export const DELETE = async (req: NextRequest) => {
  const Token = cookies().get('accessToken');
  const verify = await verifyAndRefreshToken();
  const body = await req.json();
  if (verify.status === 403 || !Token) {
    return new Response('토큰 없음', { status: 403 });
  } else if (verify.status === 200 || verify.status === 201) {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/alarm/hashtag`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token.value}`,
          },
          body: JSON.stringify(body),
        },
      ).then((res) => res.json());
      revalidateTag('hashtag');
      return NextResponse.json(data);
    } catch (error) {
      console.log('에러발생', error);
    }
  }
};
