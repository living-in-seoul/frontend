import SignupWelcome from '@/components/auth/signup/SignupWelcome';
import Icons from '@/components/common/Icons';
import { back } from '@/utils/Icon';

export default function NoNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-4 pt-5 pb-12 flex flex-col justify-between">
      <div className="mb-16 w-full h-full">
        <Icons path={back} fill="#404040" />
      </div>
      <SignupWelcome isEssential={true} />
      {children}
    </main>
  );
}
