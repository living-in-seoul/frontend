import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAndRefreshToken } from '@/service/token';
import axios from 'axios';
interface Context {
  params: { category: 'activity' | 'hashtag' };
}
const handler = async (req: any, res: any) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const backendUrl = 'https://your-backend.com/sse';
  const backendHeaders = {
    Authorization: 'Bearer YOUR_TOKEN_HERE',
    // add other headers as needed
  };

  const source = axios.CancelToken.source();

  try {
    await axios
      .get(backendUrl, {
        headers: backendHeaders,
        cancelToken: source.token,
        responseType: 'stream',
      })
      .then((response) => {
        response.data.on('data', (chunk: any) => {
          res.write(chunk); // Write data chunk to Next.js response
        });
      });
  } catch (error) {
    console.error('Error in SSE: ', error);
    res.end();
  }

  res.on('close', () => {
    console.log('Client disconnected');
    source.cancel('Client disconnected');
    res.end();
  });
  // export const GET = async (request: NextRequest, res: any) => {
  //   const Token = cookies().get('accessToken');
  //   const verify = await verifyAndRefreshToken();
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  //   res.setHeader('Cache-Control', 'no-cache, no-transform');
  //   res.setHeader('X-Accel-Buffering', 'no');

  //   for (let i = 0; i < 5; i++) {
  //     res.write(`data: Hello seq ${i}\n\n`);
  //   }
  //   res.end('done\n');
  // };
};
export { handler as GET };
