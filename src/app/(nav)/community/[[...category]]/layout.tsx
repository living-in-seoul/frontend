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

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

      <div>{children}</div>
    </section>
  );
}
