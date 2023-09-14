export const googleUrl = `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_URL}client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code&state=google&scope=https://www.googleapis.com/auth/userinfo.email`;
export const kakakoUrl = `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_URL}client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code&state=kakao`;
export const naverUrl = `${process.env.NEXT_PUBLIC_NAVER_CLIENT_URL}client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code&state=naver`;

export const socialUrls = [
  {
    url: kakakoUrl,
    text: '카카오',
    bgColor: 'bg-customYellows',
    active: 'active:bg-yellow-400',
    color: 'text-neutral-700',
  },

  {
    url: googleUrl,
    text: '구글',
    bgColor: 'bg-white',
    active: 'active:bg-neutral-100',
    color: 'text-neutral-700',
  },
  {
    url: '',
    text: '이메일',
    bgColor: 'bg-zinc-300',
    active: 'active:bg-neutral-400',
    color: 'text-neutral-700',
  },
];

export const genderArray = ['여성', '남성'];
