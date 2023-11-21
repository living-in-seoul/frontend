import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import HomeReviewSection from '@/components/home/review/HomeReview';
import { getHotTagReview } from '@/service/home';

const ReviewPage = async () => {
  const hotTagReviewPromise = await getHotTagReview();

  return (
    <>
      <HomeReviewSection hotTagReview={hotTagReviewPromise} />
    </>
  );
};
export default ReviewPage;
