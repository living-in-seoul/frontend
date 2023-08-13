import type { NextApiRequest, NextApiResponse } from 'next';
interface Req extends NextApiRequest {
  searchParams: {
    state: string;
    code: string;
    scope: string;
  };
}
export async function GET(req: Req, res: NextApiResponse) {
  const { searchParams } = req;
  console.log(searchParams);
  return res.redirect('/home');
}
