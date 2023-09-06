import axios from 'axios';
import { cookies } from 'next/headers';

//Vercel 서버리스 함수의 런타임을 Node.js로 설정
export const runtime = 'nodejs';
// 함수를 동적으로 처리
export const dynamic = 'force-dynamic';

export async function GET() {
  let responseStream = new TransformStream(); //TransformStream을 생성
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();
  //해당 스트림의 writer와 TextEncoder 인스턴스 가져오기.
  writer.write(encoder.encode('스트리밍 시작\n'));

  const Token = cookies().get('accessToken')?.value;
  const backendUrl = `${process.env.NEXT_PUBLIC_SERVER}/notice`;
  const backendHeaders = {
    Authorization: `Bearer ${Token}`,
  };

  try {
    //스트림 요청
    await axios
      .get(backendUrl, {
        headers: backendHeaders,
        responseType: 'stream',
      })
      .then((response) => {
        response.data.on('data', async (chunk: Buffer) => {
          await writer.write(encoder.encode(chunk.toString()));
        });
      });
  } catch (error) {
    console.error('Error in SSE: ', error);
    writer.write(encoder.encode('에러발생\n'));
    writer.close(); // 에러발생시 스트림 바로 닫아주기
    return new Response(responseStream.readable, {
      status: 500,
    });
  }
  //스트림 클라이언트내려주기
  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}
