import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAndRefreshToken } from '@/service/token';
interface Context {
  params: { category: 'activity' | 'hashtag' };
}

export const GET = async (request: NextRequest, context: Context) => {
  const { category } = context.params;

  const Token = cookies().get('accessToken');
  const verify = await verifyAndRefreshToken();
  console.log(category, Token);
  if (verify.status === 403 || !Token) {
    return new Response('토큰 없음', { status: 403 });
  } else if (verify.status === 200) {
    try {
      const data = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER
        }/alarm/activity?page=${1}&size=${10}&alarmCategory=${category}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token.value}`,
          },
        },
      ).then((res) => res.json());
      // console.log(data);
      return NextResponse.json(data);
    } catch (error) {
      console.log('asdfsafasdf', error);
    }
  }
};

export const POST = async (request: NextRequest, context: Context) => {
  const { category } = context.params;

  const Token = cookies().get('accessToken');
  const verify = await verifyAndRefreshToken();

  if (verify.status === 403 || !Token) {
    return new Response('토큰 없음', { status: 403 });
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
      // console.log(data);
      return NextResponse.json(data);
    } catch (error) {
      console.log('asdfsafasdf', error);
    }
  }
};
