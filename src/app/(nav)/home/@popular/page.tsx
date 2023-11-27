import HomeHasTagMapSection from '@/components/home/HomeHasTagMapSection';
import HomeHasTagTopSelect from '@/components/home/HomeHasTagTopSelect';
import { getHotTagMap } from '@/service/home';

const getHotTagMapList = async (
  pop: string,
): Promise<ResponsePopularCategoryHashtag> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/tags/posts?category=&page=1&size=1&hashtagName=${pop}&type=popular`,
    );
    if (!response.ok) {
      console.log('Fetching error');
    }
    const postList: ResponsePopularCategoryHashtag = await response.json();
    return postList;
  } catch (error) {
    throw new Error('network error');
  }
};

const PopularPage = async ({ params }: { params: { pop: string } }) => {
  const locationTagPromise = await getHotTagMap();
  // const locationTagPromise = ['Seoul'];
  const pop = params.pop || locationTagPromise[0];

  const postList = await getHotTagMapList(pop);
  // const postList = [exampleMapPost];

  return (
    <article className="relative w-full pt-2.5">
      <HomeHasTagTopSelect HotTagReview={locationTagPromise} />
      <HomeHasTagMapSection postList={postList.result} />
    </article>
  );
};
export default PopularPage;
