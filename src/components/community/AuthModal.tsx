'use client';
import SigninButtons from '@/components/auth/signin/SigninButtons';
import { usePathname } from 'next/navigation';

const AuthModal = () => {
  const callbackUrl = usePathname() ?? '';

  return (
    <article className="">
      <SigninButtons callbackUrl={callbackUrl} />
    </article>
  );
};
export default AuthModal;
