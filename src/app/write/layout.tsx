'use client';
import { RecoilRoot } from 'recoil';

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full">
      <RecoilRoot>{children}</RecoilRoot>
      <div id="imagePortal" />
    </main>
  );
}
