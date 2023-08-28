import Navbar from '@/components/layouts/Navbar';
import MypageHeader from '@/components/profile/mypage/MypageHeader';
import MypageProfile from '@/components/profile/mypage/MypageProfile';
import MypageLink from '@/components/profile/mypage/MypageLink';
import { MYPAGE_LINK_NAME } from '@/utils/constants/board';

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex flex-col gap-7 px-4 pt-4">
        <MypageHeader />
        <MypageProfile />
        <nav className="w-full flex">
          {MYPAGE_LINK_NAME.map((category) => (
            <MypageLink key={category.link} category={category}>
              {category.name}
            </MypageLink>
          ))}
        </nav>
        {children}
      </main>
      <Navbar />
    </>
  );
}
