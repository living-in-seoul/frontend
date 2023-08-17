import logo from '@/../public/logo.png';
import seole from '@/../public/seole.png';
import Image from 'next/image';
export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <section className="relative w-screen h-screen flex items-center justify-center flex-col bg-teal-400">
      <Image src={logo} alt="logo" width={288} height={36} />
      <div className="absolute bottom-0">
        <Image src={seole} alt="logo" width={300} height={400} />
      </div>
    </section>
  );
}
