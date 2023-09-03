import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  const Token = req.cookies['accessToken'];
  console.log(Token);
  const backendUrl = 'https://seoulvival.com:8080/notice';
  const backendHeaders = {
    Authorization: `Bearer ${Token}`,
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
          res.write(chunk);
        });
      });
  } catch (error) {
    console.error('Error in SSE: ', error);
    res.status(500).end();
  }

  res.on('close', () => {
    console.log('Client disconnected');
    source.cancel('Client disconnected');
    res.end();
  });
};

export default handler;
