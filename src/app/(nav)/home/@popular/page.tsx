import HomeHasTagMapSection from '@/components/home/HomeHasTagMapSection';

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
const PopPage = ({ searchParams }: PageProps) => {
  const { locationTag } = searchParams;
  return <HomeHasTagMapSection hashtag={locationTag} />;
};
export default PopPage;
