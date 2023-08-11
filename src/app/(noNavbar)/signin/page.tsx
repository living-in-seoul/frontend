import DefaultLogin from '@/components/auth/DefaultLogin';
import SocialAuth from '@/components/auth/SocialAuth';

const socialUrls = {
  googleUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code&state=google&scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly`,
  kakakoUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code`,
  naverUrl: `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code&state=naver`,
};
const SignIpPage = () => {
  return (
    <section className="flex justify-center items-center">
      <DefaultLogin />
      <SocialAuth text="구글" url={socialUrls.googleUrl} />
      <SocialAuth text="카카오" url={socialUrls.kakakoUrl} />
      <SocialAuth text="네이버" url={socialUrls.naverUrl} />
    </section>
  );
};
export default SignIpPage;
