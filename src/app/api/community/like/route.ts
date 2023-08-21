import { getCommunityList } from '@/service/comunity';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const postId = await req.json();
  const Token = req.cookies.get('accessToken');

  console.log(Token);

  if (!Token) {
    return new Response('로그인을 해야합니다!', { status: 401 });
  }
  if (postId === undefined) {
    return new Response('잘못된 요청입니다!', { status: 400 });
  }
  //   const postType = searchParams.get('category');
  //   return await getCommunityList(category, postType, hashtagName).then((data) =>
  //     NextResponse.json(data),
  //   );
  return NextResponse.json('좋아요 성공!');
};
