import type { NextApiRequest, NextApiResponse } from 'next';
interface Req extends NextApiRequest {
  searchParams: {
    state: string;
    code: string;
    scope: string;
  };
}
export async function GET(_: NextApiRequest, res: NextApiResponse) {
  return res.redirect('/home');
}
