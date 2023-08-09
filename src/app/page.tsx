import dynamic from 'next/dynamic';
const DynamicMap = dynamic(() => import('../components/map/Map'), {
  ssr: false,
});
export default function Home() {
  return (
    <>
      <DynamicMap />
    </>
  );
}
