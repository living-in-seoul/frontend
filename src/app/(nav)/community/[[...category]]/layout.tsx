import Link from 'next/link';
import NavLink from '../CommunityLink';

const LINK_NAME = [
  {
    link: null,
    name: '전체',
  },
  {
    link: 'review',
    name: '후기',
  },
  {
    link: 'communication',
    name: '동향소통',
  },
  {
    link: 'Life',
    name: '생활정보',
  },
];

export default async function CommunityLayout({
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
      <Link
        href={'/write'}
        className="fixed bottom-20 right-0 w-12 h-12 bg-neutral-700 rounded-full"
      >
        a
      </Link>
    </section>
  );
}
