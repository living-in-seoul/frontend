import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get('search') ?? '';
  const Keyword = encodeURIComponent(search);
  const list = searchParams.has('list');

  try {
    const res = await fetch(
      // `${process.env.NEXT_PUBLIC_SERVER}/search?page=1&size=10&keword=${search}`,
      `${process.env.NEXT_PUBLIC_SERVER}/search?page=1&size=10&category=&keyword=${Keyword}`,
      { next: { revalidate: 0 } },
    )
      .then<ResponseRegister>((res) => res.json())
      .then((res) => res.result);

    if (res.length === 0) {
      return NextResponse.json([]);
    }
    if (list) {
      return NextResponse.json(res);
    }
    const result = res.map((item) => {
      const PostContent =
        search[0] === '#' ? item.post.hashtag : item.post.content;
      let highlightedContent = PostContent;
      if (search) {
        const regex = new RegExp(`(${search})`, 'gi'); // 대소문자를 구분하지 않는 글로벌 검색
        highlightedContent = highlightedContent.replace(regex, '<b>$1</b>');
      }
      return {
        PostId: item.post.postId,
        PostTag: item.post.hashtag,
        PostContent: highlightedContent,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log('error', error);
  }
};
export const POST = async (req: NextRequest) => {
  const search = await req.json();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/search/save`, {
      method: 'POST',
      body: JSON.stringify(search),
    }).then((result) => result.json());

    return NextResponse.json(res);
  } catch (error) {
    console.log('error', error);
  }
};
