'use client';
import { usePathname } from 'next/navigation';
import SigninButtons from '../auth/signin/SigninButtons';

const LoginContent = () => {
  const pathname = usePathname() || '/home';
  return (
    <div className="flex flex-col px-4">
      <div className="text-center text-black text-xl font-semibold leading-normal pb-1">
        로그인 후 서울바이벌을 즐겨보세요
      </div>
      <div className="text-center text-neutral-500 text-base font-normal leading-normal pb-9">
        서울바이벌 회원만이 선택한 기능을 이용할 수 있어요
      </div>
      <SigninButtons callbackUrl={pathname} />
    </div>
  );
};
export default LoginContent;
