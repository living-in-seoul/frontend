import DefaultLogin from '@/components/auth/signin/DefaultLogin';
import Icons from '@/components/common/Icons';
import { close } from '@/utils/Icon';

interface EmailSigninPageProps {
  params: {
    slug: string[];
  };
}
const closePath = {
  path: close,
  height: 21,
  width: 20,
};
const EmailSigninPage = ({ params }: EmailSigninPageProps) => {
  const { slug } = params;

  return (
    <section>
      <DefaultLogin />
    </section>
  );
};

export default EmailSigninPage;
