import SocialAuth from '@/components/auth/SocialAuth';
import { signinDataHandler } from '@/service/user';
import Link from 'next/link';

const SignIpPage = () => {
  const id = 1;
  return (
    <section className="flex justify-center items-center">
      <form
        action={signinDataHandler}
        className="flex flex-col h-52 w-52 border border-neutral-700 p-5 gap-3"
      >
        <input name="id" type="text" className="w-full" placeholder="id" />
        <input name="pw" type="password" className="w-full" placeholder="pw" />
        <button>submit</button>
        <Link href={`/signup/${id}`}>signup</Link>
      </form>
      <SocialAuth />
    </section>
  );
};
export default SignIpPage;
