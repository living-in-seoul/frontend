import dynamic from 'next/dynamic';

const DynamicHomeHomeTownSection = dynamic(
  () => import('@/components/home/hometown/HomeHomeTown'),
);

const HomeTownPage = () => {
  return <DynamicHomeHomeTownSection />;
};
export default HomeTownPage;
