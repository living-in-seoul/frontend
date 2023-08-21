import SignupFirst from '@/components/auth/signup/SignupFirst';
import SignupHeader from '@/components/auth/signup/SignupHeader';
import SignupSecond from '@/components/auth/signup/SignupSecond';

interface EmailSigninPageProps {
  params: {
    slug: string;
  };
}

const SignUpPage = ({ params }: EmailSigninPageProps) => {
  const { slug } = params;

  switch (slug) {
    case 'first':
      return <SignupFirst />;
    case 'second':
      return <SignupSecond />;
  }
};

export default SignUpPage;
