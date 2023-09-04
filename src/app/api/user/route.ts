import { verifyAndRefreshToken } from '@/service/token';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/** 유저 토큰 검증 */
export const GET = async (req: NextRequest) => {
  const verify = await verifyAndRefreshToken();

  // console.log('verify', verify);

  if (verify.status === 200 || verify.status === 201) {
    return new Response('OK', { status: 200 });
  }
  return new Response('Unauthorized no token', { status: 401 });
};

export const DELETE = (_: NextRequest) => {
  const accessToken = cookies().get('accessToken');
  const refreshToken = cookies().get('refreshToken');
  if (accessToken || refreshToken) {
    cookies().delete('accessToken');
    cookies().delete('refreshToken');
  }
  return NextResponse.json('토큰 삭제 완료');
};

/*
1. submit 버튼 누른 후 next server api로 요청
2. cookie에서 AT 꺼내오기 (있음 -> status 200)
3. 없음 -> RT 가지고 refresh token 요청하기
4. 200 -> token 날라오면 set하기(신범님 코드 보기 (signin))
5. set 성공? client에 status 200 / set 실패? 405 보내고 client에서 로그인하라고 모달 띄우기
*/
