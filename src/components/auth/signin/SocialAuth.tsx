'use client';
import SocialIcons from './SocialIcon';
import { redirect, useRouter } from 'next/navigation';
interface SocialAuthProps {
  text: string;
  url: string;
  bgColor: string;
  color?: string;
}

const SocialAuth = ({ text, url, bgColor, color }: SocialAuthProps) => {
  const router = useRouter();

  const oauthHandler = (url: string) => {
    redirect(url);
  };

  return (
    <>
      {text === '이메일' ? (
        <div
          className={`relative rounded-xl h-12 flex flex-row justify-center items-center border p-3 ${bgColor} ${color}`}
          onClick={() => router.push('/signin/user')}
        >
          <div className="absolute left-4">
            <SocialIcons text={text} />
          </div>

          <button className="text-center font-semibold" type="submit">
            {text}로 시작하기
          </button>
        </div>
      ) : (
        <form
          className={`relative rounded-xl h-12 flex flex-row justify-center items-center border p-3 ${bgColor} ${color}`}
          action={() => oauthHandler(url)}
        >
          <div className="absolute left-4">
            <SocialIcons text={text} />
          </div>

          <button
            className=" w-full h-full text-center font-semibold"
            type="submit"
          >
            {text}로 시작하기
          </button>
        </form>
      )}
    </>
  );
};

export default SocialAuth;
