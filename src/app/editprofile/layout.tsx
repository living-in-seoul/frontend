export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-4 h-screen  flex flex-col relativ ">{children}</main>
  );
}
