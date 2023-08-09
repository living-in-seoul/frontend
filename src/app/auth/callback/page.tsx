import type { NextApiRequest, NextApiResponse } from 'next';
interface Req extends NextApiRequest {
  searchParams: {
    state: string;
    code: string;
    scope: string;
  };
}
async function Callback(req: Req, res: NextApiResponse) {
  const { searchParams } = req;

  return <div></div>;
}

export default Callback;
