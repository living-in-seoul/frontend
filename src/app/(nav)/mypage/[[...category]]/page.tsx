import MypageHeader from '@/components/profile/mypage/MypageHeader';
import MypageLink from '@/components/profile/mypage/MypageLink';
import MypageList from '@/components/profile/mypage/MypageList';
import MypageProfile from '@/components/profile/mypage/MypageProfile';
import { MYPAGE_LINK_NAME } from '@/utils/constants/board';

const MypagePage = () => {
  return (
    <section className="flex flex-col gap-7 px-4 pt-4">
      <MypageHeader />
      <MypageProfile />
      <nav className="w-full flex">{/* <MypageLink /> */}</nav>
      <MypageList />
    </section>
  );
};
export default MypagePage;
