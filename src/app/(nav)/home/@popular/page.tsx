import dynamic from 'next/dynamic';

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
export const revalidate = 60 * 60 * 5;
const DynamicMapSection = dynamic(
  () => import('@/components/home/HomeHasTagMapSection'),
);
const PopPage = ({ searchParams }: PageProps) => {
  const { locationTag } = searchParams;
  return <DynamicMapSection hashtag={locationTag} />;
};
export default PopPage;
