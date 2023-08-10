import SocialAuth from '@/components/auth/SocialAuth';
import { signinDataHandler } from '@/service/user';
import Link from 'next/link';

const socialUrls = {
  googleUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code&state=google&scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly`,
  kakakoUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code`,
  naverUrl: `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code&state=naver`,
};
const SignIpPage = () => {
  return (
    <section className="flex justify-center items-center">
      <form
        action={signinDataHandler}
        className="flex flex-col h-52 w-52 border border-neutral-700 p-5 gap-3"
      >
        <input name="id" type="text" className="w-full" placeholder="id" />
        <input name="pw" type="password" className="w-full" placeholder="pw" />
        <button>submit</button>
      </form>
      <SocialAuth text="구글" url={socialUrls.googleUrl} />
      <SocialAuth text="카카오" url={socialUrls.kakakoUrl} />
      <SocialAuth text="네이버" url={socialUrls.naverUrl} />
    </section>
  );
};
export default SignIpPage;
