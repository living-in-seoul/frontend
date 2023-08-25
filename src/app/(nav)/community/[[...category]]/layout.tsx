import Link from 'next/link';
import { LINK_NAME } from '@/utils/constants/board';
import NavLink from '../CommunityLink';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await fetch('http://localhost:3000/api/user', {
  //   method: 'GET',
  //   cache: 'no-cache',
  // }).then((res) => res.json());
  // console.log(user);
  return (
    <section>
      <div className="relative flex flex-col justify-between w-full h-40 bg-neutral-200">
        <div />
        <div className="flex justify-between">
          {/* 서초구 서초동 */}
          {/* 검색 알림 */}
        </div>
        <nav className="w-full flex px-4">
          {LINK_NAME.map((category) => (
            <NavLink key={category.link} category={category}>
              {category.name}
            </NavLink>
          ))}
        </nav>
      </div>
      {/* {user === 'Yes' ? <>있음</> : <>없음</>} */}
      <div>{children}</div>
    </section>
  );
}
