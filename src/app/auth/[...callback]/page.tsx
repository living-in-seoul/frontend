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

  // code 넘기고 이거저거 하고 여기서 유저등록이 되면 거기다가 이메일로인식해서
  //  추가정보 받는 페이지로 넘기고 그 담에는 로그인 페이지 자동적으로 가서 ㄱㄱ
  return <div></div>;
}

export default Callback;

// 1 회원이 정보가 없을 때
// 페이지로 들어오게 되면 서버랑 통신을해서 db에 회원 저장 소셜기반 email을 전 받아요
// 토큰 받고 추가정보페이지로 넘어가면
// 다 기입하고 if문으로 소셜로그인인지 그냥로그인인지 파악해서 소셜로그인일경우
// redirect로 설정해야함 api에서 bff로넘어오면 setcookie response
// use client로 될 것같아서 req.cookie xx api로 넘어가서 bff
// response email 2차인증때 토큰하는게 아니라 email parmas 가입하고있는 유저를 식별할
// 미들웨어에서 넘어기지않는다 signup token이 있으면
