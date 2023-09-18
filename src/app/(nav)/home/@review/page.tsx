import dynamic from 'next/dynamic';

export const revalidate = 60 * 60 * 5;

const DynamicReviewSection = dynamic(
  () => import('@/components/home/review/HomeReview'),
);

const ReviewPage = () => {
  return <DynamicReviewSection />;
};
export default ReviewPage;
