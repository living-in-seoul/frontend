import MypageHeader from '@/components/profile/mypage/MypageHeader';
import MypageLink from '@/components/profile/mypage/MypageLink';
import MypageList from '@/components/profile/mypage/MypageList';
import MypageProfile from '@/components/profile/mypage/MypageProfile';
import MyscrapList from '@/components/profile/mypage/MyscrapList';
import { MYPAGE_LINK_NAME } from '@/utils/constants/board';

interface MypagePageProps {
  params: {
    category: string;
  };
}
const MypagePage = ({ params }: MypagePageProps) => {
  const { category = 'writed' } = params;
  console.log(category);
  return (
    <section className="flex flex-col gap-7 px-4 pt-4">
      <MypageHeader />
      <MypageProfile />
      <nav className="w-full flex">
        {MYPAGE_LINK_NAME.map((category) => (
          <MypageLink key={category.link} category={category}>
            {category.name}
          </MypageLink>
        ))}
      </nav>
      {category === 'writed' ? (
        <MypageList category={category} />
      ) : (
        <MyscrapList category={category} />
      )}
    </section>
  );
};
export default MypagePage;
