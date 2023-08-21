import SigninButtons from '@/components/auth/signin/SigninButtons';
import SigninWelcome from '@/components/auth/signin/SigninWelcome';
interface SigninProps {
  searchParams: {
    callbackUrl: string;
  };
}

const SignIpPage = ({ searchParams: { callbackUrl } }: SigninProps) => {
  return (
    <section className="flex flex-col ">
      <SigninWelcome />
      <div className="mt-44 w-full h-10 relative flex items-center justify-center">
        <span className="bg-white z-10 px-3 text-zinc-400">
          SNS로 간편하게 로그인하세요
        </span>
        <div className="absolute top-0 w-full h-5 border-b border-b-zinc-400 " />
      </div>
      <SigninButtons callbackUrl={callbackUrl} />
    </section>
  );
};
export default SignIpPage;
