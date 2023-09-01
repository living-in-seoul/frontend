import Link from 'next/link';
import HomeSectionTitle from './HomeSectionTitle';
import HomeWeekleyItem from './HomeWeekleyItem';

const HomeWeekleyTopFiveSection = async () => {
  const weekleyTopFivelist = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/post/All?page=1&size=5&hashtagName=&type=popular`,
  ).then<ResponseRegister>((res) => res.json());

  return (
    <article className="relative w-full border-b-[5px] border-zinc-300 pb-2">
      <HomeSectionTitle title="주간 TOP 5 커뮤니티 게시글" />
      <ul className="flex gap-4 whitespace-nowrap scrollbar-hide overflow-x-auto pl-4">
        {weekleyTopFivelist ? (
          weekleyTopFivelist.result.map((item, index) => (
            <Link
              key={item.post.postId}
              href={`/detail/${item.post.postId}`}
              className="cursor-pointer "
            >
              <HomeWeekleyItem {...item} key={item.post.postId} />
            </Link>
          ))
        ) : (
          <>게시물이 없습니다</>
        )}
      </ul>
    </article>
  );
};
export default HomeWeekleyTopFiveSection;
