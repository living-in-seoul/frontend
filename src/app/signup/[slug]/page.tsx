import SignupFirst from '@/components/auth/signup/SignupFirst';
import SignupHeader from '@/components/auth/signup/SignupHeader';
import SignupSecond from '@/components/auth/signup/SignupSecond';
import SignupWelcome from '@/components/auth/signup/SignupWelcome';

interface EmailSigninPageProps {
  params: {
    slug: string;
  };
}

const SignUpPage = ({ params }: EmailSigninPageProps) => {
  const { slug } = params;
  return (
    <>
      <SignupHeader slug={slug} />
      <SignupWelcome slug={slug} />
      {slug === 'first' ? <SignupFirst /> : <SignupSecond />}
    </>
  );
};

export default SignUpPage;
