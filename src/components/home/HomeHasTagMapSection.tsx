import Link from 'next/link';
import HomeSectionTitle from './HomeSectionTitle';
import Select from '@/components/common/Select';
import PostItem from '@/components/community/PostItem';
import MapProvider from '@/context/MapProvider';
import { memo } from 'react';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./HomeHashtagMap'), {
  ssr: true,
});

interface HomeReviewSectionProps {
  [key: string]: string | string[] | undefined;
}
const HomeHasTagMapSection = async ({ hashtag }: HomeReviewSectionProps) => {
  const HotTagReview = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/All`,
    { next: { revalidate: 0 } },
  ).then<string[]>((res) => res.json());

  const hashtags = hashtag ?? HotTagReview[0];

  const PostList = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/post/All?page=1&size=1&hashtagName=${hashtags}&type=popular`,
  )
    .then<ResponseRegister>((res) => res.json())
    .then<ResponsePost[]>((res) => res.result);
  console.log(PostList);
  const { post, location } = PostList[0];
  return (
    <article className="relative w-full border-b-[5px] border-zinc-300 pb-2">
      <HomeSectionTitle title="해시태그 언급이 잦은 장소에요" link="/map" />
      {HotTagReview ? (
        <>
          <ul className="pl-4 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
            {HotTagReview?.map((item) => (
              <Link
                key={item}
                href={`/home?locationTag=${item}`}
                scroll={false}
              >
                <Select
                  title={`#${item}`}
                  className="rounded-md"
                  disable
                  selectTag={item === hashtags}
                />
              </Link>
            ))}
          </ul>
          <MapProvider type={'home'}>
            <div className="w-full p-4">
              <DynamicMap location={location} />
            </div>
          </MapProvider>
          <div className="flex flex-col w-full">
            <div key={post.postId}>
              <Link
                key={post.postId}
                href={`/detail/${post.postId}`}
                className="cursor-pointer hover:bg-zinc-200 transition-all duration-200 active:bg-zinc-200"
              >
                <PostItem {...PostList[0]} />
              </Link>
            </div>
          </div>{' '}
        </>
      ) : (
        <>게시물이 없습니다</>
      )}
    </article>
  );
};
export default memo(HomeHasTagMapSection);
