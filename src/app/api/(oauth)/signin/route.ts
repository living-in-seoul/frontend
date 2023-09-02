import { postSingin } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/** 로그인 POST */
export const POST = async (request: NextRequest) => {
  try {
    const body: RequestLogin = await request.json();
    const data = await postSingin(body);
    cookies().set({
      name: 'accessToken',
      value: data.accessToken,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 2,
      sameSite: 'none',
      secure: true,
    });
    cookies().set({
      name: 'refreshToken',
      value: data.refreshToken,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'none',
      secure: true,
    });
    return NextResponse.json(data);
  } catch (err) {
    return new Response('잘못된 정보입니다', { status: 401 });
  }
};

// expire 만료시간을 정할 수 있다 정해서 access api 요청 refresh => 로그인 페이지로 보내고
// 로그인이 필요한 페이지에만 api를 붙인다
// enabled 앞서 호출한 데이터가 있을 경우 뒤에있는 비동기통신을 실행시킨다 swr에서 있는지 찾아보자
// 쿠키스토리지에 담겨져있는 것 === 클라이언트에서 관리할 수 있다는 점임
//
