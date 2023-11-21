import HomeHasTagMapSection from '@/components/home/HomeHasTagMapSection';
import { getHotTagMap, getHotTagReview } from '@/service/home';

const ReviewPage = async () => {
  const locationTagPromise = await getHotTagMap();

  return (
    <>
      <HomeHasTagMapSection HotTagReview={locationTagPromise} />
    </>
  );
};
export default ReviewPage;
