import MypageList from '@/components/profile/mypage/MypageList';

interface MypagePageProps {
  params: {
    category: string;
  };
}
const MypagePage = ({ params }: MypagePageProps) => {
  const { category } = params;
  return (
    <section>
      <MypageList category={category} />
    </section>
  );
};
export default MypagePage;
