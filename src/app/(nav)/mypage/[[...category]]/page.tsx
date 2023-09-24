import AlertButtonComponent from '@/components/home/AlertButtonComponent';
import Header from '@/components/layouts/Header';
import MypageLink from '@/components/profile/mypage/MypageLink';
import MypageList from '@/components/profile/mypage/MypageList';
import MypageProfile from '@/components/profile/mypage/MypageProfile';

const MypagePage = () => {
  return (
    <section className="flex flex-col gap-7 px-4 pt-4">
      <Header
        left={<span className="font-semibold text-base">마이페이지</span>}
        right={<AlertButtonComponent link="/alert" type="community" />}
      />

      <MypageProfile />
      <nav className="w-full flex">
        <MypageLink />
      </nav>
      <MypageList />
    </section>
  );
};
export default MypagePage;
