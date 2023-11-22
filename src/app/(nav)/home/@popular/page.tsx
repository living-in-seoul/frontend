import HomeHasTagMapSection from '@/components/home/HomeHasTagMapSection';
import HomeHasTagTopSelect from '@/components/home/HomeHasTagTopSelect';
import { getHotTagMap, getHotTagReview } from '@/service/home';
import { exampleMapPost } from '@/utils/constants/mock.test';

const getHotTagMapList = async (pop: string) => {
  try {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_SERVER}/tags/posts?category=&page=1&size=1&hashtagName=${pop}&type=popular`,
    // );

    // const postList: ResponsePost[] = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [exampleMapPost];
  } catch (error) {
    throw new Error('network error');
  }
};

const PopularPage = async ({ params }: { params: { pop: string } }) => {
  // const locationTagPromise = await getHotTagMap();
  const locationTagPromise = ['Seoul'];
  const { pop } = params;
  const postList = await getHotTagMapList(pop ?? locationTagPromise[0]);
  // const postList = [exampleMapPost];

  return (
    <article className="relative w-full pt-2.5">
      <HomeHasTagTopSelect HotTagReview={locationTagPromise} />
      <HomeHasTagMapSection postList={postList} />
    </article>
  );
};
export default PopularPage;
