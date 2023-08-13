import SocialAuth from './SocialAuth';

const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code&state=google&scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly`;
const kakakoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code`;
const naverUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code&state=naver`;

const socialUrls = [
  {
    url: kakakoUrl,
    text: '카카오',
    bgColor: 'bg-customYellows',
    color: 'text-neutral-700',
  },
  {
    url: naverUrl,
    text: '네이버',
    bgColor: 'bg-green-500',
    color: 'text-white',
  },
  {
    url: googleUrl,
    text: '구글',
    bgColor: 'bg-white',
    color: 'text-neutral-700',
  },
  {
    url: '',
    text: '이메일',
    bgColor: 'bg-zinc-300',
    color: 'text-neutral-700',
  },
];

const SigninButtons = () => {
  return (
    <div className="flex flex-col gap-3 ">
      {socialUrls.map(({ text, url, bgColor, color }, index) => (
        <SocialAuth
          key={`${text}${index} `}
          text={text}
          url={url}
          bgColor={bgColor}
          color={color}
        />
      ))}
    </div>
  );
};

export default SigninButtons;
