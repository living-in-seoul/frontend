import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAndRefreshToken } from '@/service/token';
interface Context {
  params: { category: 'activity' | 'hashtag' };
}

export const GET = async (_: NextRequest, context: Context) => {
  const { category } = context.params;

  const Token = cookies().get('accessToken');
  const verify = await verifyAndRefreshToken();
  if (verify.status === 403 || !Token) {
    return new Response('토큰 없음');
  } else if (verify.status === 200) {
    try {
      const data = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER
        }/alarm/activity?page=${1}&size=${10}&alarmCategory=${category}`,
        {
          next: { revalidate: 0 },
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token.value}`,
          },
        },
      ).then((res) => res.json());
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json('');
    }
  }
};

export const POST = async (_: NextRequest, context: Context) => {
  const { category } = context.params;

  const Token = cookies().get('accessToken');
  const verify = await verifyAndRefreshToken();

  if (verify.status === 403 || !Token) {
    return new Response('토큰 없음');
  } else if (verify.status === 200) {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/alarm/read/${category}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token.value}`,
          },
        },
      ).then((res) => res.json());
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json('');
    }
  }
};
