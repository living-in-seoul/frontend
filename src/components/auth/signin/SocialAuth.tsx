'use client';
import SocialIcons from './SocialIcon';
import { useRouter } from 'next/navigation';
interface SocialAuthProps {
  text: string;
  url: string;
  bgColor: string;
  color?: string;
  active?: string;
}
const SocialAuth = ({ text, url, bgColor, color, active }: SocialAuthProps) => {
  const router = useRouter();

  const oauthHandler = (url: string) => {
    window.location.href = url;
  };

  return (
    <>
      <div
        className={`relative cursor-pointer rounded-xl h-12 flex flex-row justify-center items-center border p-3 ${active} ${bgColor} ${color}`}
        onClick={
          text === '이메일'
            ? () => router.replace('/signin/user')
            : () => oauthHandler(url)
        }
      >
        <div className="absolute left-4">
          <SocialIcons text={text} />
        </div>
        <button className="text-center font-semibold" type="submit">
          {text}로 시작하기
        </button>
      </div>
    </>
  );
};

export default SocialAuth;
