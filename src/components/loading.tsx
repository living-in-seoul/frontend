'use client';
import logo from '@/../public/logo.png';
import seole from '@/../public/seole.png';
import Image from 'next/image';
import BeatLoader from './common/Spinner';
import { useEffect } from 'react';
import { useRouter } from 'next-nprogress-bar';
export default function Loading() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/home', {}, { showProgressBar: true });
    }, 3000);
  }, [router]);
  return (
    <section className="relative w-full h-screen flex items-center justify-center gap-10 flex-col bg-teal-400">
      <Image src={logo} alt="logo" width={288} height={36} priority={false} />
      <BeatLoader color="white" size={15} className="z-50" />
      <div className="absolute bottom-0">
        <Image
          src={seole}
          alt="logo"
          width={300}
          height={400}
          priority={false}
        />
      </div>
    </section>
  );
}
