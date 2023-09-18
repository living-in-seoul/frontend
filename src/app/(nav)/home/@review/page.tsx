import HomeReviewSection from '@/components/home/review/HomeReview';
export const revalidate = 60 * 60 * 5;
// export const runtime = 'edge';
const ReviewPage = () => {
  return <HomeReviewSection />;
};
export default ReviewPage;
