'use client';
import SigninButtons from '@/components/auth/signin/SigninButtons';

const AuthModal = () => {
  return (
    <article className="">
      <SigninButtons callbackUrl="community" />
    </article>
  );
};
export default AuthModal;
