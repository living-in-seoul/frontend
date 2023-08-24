import Link from 'next/link';
import HomeSectionTitle from './HomeSectionTitle';
import Select from '@/components/common/Select';
import PostItem from '@/components/community/PostItem';

interface HomeReviewSectionProps {
  [key: string]: string | string[] | undefined;
}
const HomeHometownSection = async ({ hashtag }: HomeReviewSectionProps) => {
  const HotTagHomeTown = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/category?category=동향소통`,
  ).then<string[]>((res) => res.json());
  const hashtags = hashtag ?? HotTagHomeTown[0];
  const PostList = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/post/category?page=1&size=2&hashtagName=${hashtags}&category=동향소통&type=popular`,
  )
    .then<ResponseRegister>((res) => res.json())
    .then<ResponsePost[]>((res) => res.result);

  return (
    <article className="relative w-full border-b-[5px] border-zinc-300 ">
      <HomeSectionTitle
        title="동향 사람들과 소통해 보세요"
        link="/community/communication"
      />
      <ul className="pl-4 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
        {HotTagHomeTown?.map((item) => (
          <Link key={item} href={`/home?hometownTag=${item}`} scroll={false}>
            <Select
              size="medium"
              title={`#${item}`}
              disable
              selectTag={item === hashtags}
            />
          </Link>
        ))}
      </ul>
      <div className="flex flex-col w-full">
        {PostList?.map((item) => (
          <Link
            key={item.post.postId}
            href={`/detail/${item.post.postId}`}
            className="cursor-pointer hover:bg-zinc-200 transition-all duration-200 active:bg-zinc-200"
          >
            <PostItem key={item.post.postId} {...item} />
          </Link>
        ))}
      </div>
    </article>
  );
};
export default HomeHometownSection;
