import SigninHeader from '@/components/auth/signin/SigninHeader';

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-4 h-screen  flex flex-col relativ gap-10 ">
      <SigninHeader />
      {children}
    </main>
  );
}
