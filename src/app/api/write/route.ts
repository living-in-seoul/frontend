import { NextRequest, NextResponse } from 'next/server';
import { writeBoard } from '@/service/board';

/**글쓰기 페이지 post api */
export const POST = async (
  request: NextRequest,
): Promise<Response | NextResponse> => {
  const form = await request.formData();
  const data = await writeBoard(form).then((data) => data.message);
  return NextResponse.json(data);
};

// export const GET = async (req: NextRequest) => {
//   const cookiesStorage = cookies();
//   const token = cookiesStorage.get('refreshToken');
//   const params = req.nextUrl.searchParams;
//   const query = params.get('code');
//   return NextResponse.json(query);
// };
