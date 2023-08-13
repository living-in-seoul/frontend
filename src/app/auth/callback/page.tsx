import type { NextApiRequest, NextApiResponse } from 'next';
interface Req extends NextApiRequest {
  searchParams: {
    state: string;
    code: string;
    scope: string;
  };
}
const Callback = async (
  req: Req,
  res: NextApiResponse,
): Promise<ResponseOauthLogin> => {
  const { searchParams } = req;
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}`, {
    method: 'POST',
    body: JSON.stringify({ code: searchParams.code }),
  }).then((response) => response.json());
  return response.data;
};

export default Callback;
