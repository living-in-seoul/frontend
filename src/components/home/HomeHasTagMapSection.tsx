import Link from 'next/link';
import HomeSectionTitle from './HomeSectionTitle';
import Select from '@/components/common/Select';
import PostItem from '@/components/community/PostItem';
import MapProvider from '@/context/MapProvider';
import { memo } from 'react';
import dynamic from 'next/dynamic';
import SelectedLocation from '../write/location/SelectedLocation';

const DynamicMap = dynamic(() => import('./HomeHashtagMap'), {
  ssr: false,
});

interface HomeReviewSectionProps {
  [key: string]: string | string[] | undefined;
}
const HomeHasTagMapSection = async ({ hashtag }: HomeReviewSectionProps) => {
  const HotTagReview = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/rank?category=`,
    { next: { revalidate: 0 } },
  ).then<string[]>((res) => res.json());

  const hashtags = hashtag ?? HotTagReview[0];

  const PostList = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/posts?category=&page=1&size=1&hashtagName=${hashtags}&type=popular`,
  )
    .then<ResponseRegister>((res) => res.json())
    .then<ResponsePost[]>((res) => res.result);

  const { post, location } = PostList[0];
  return (
    <article className="relative w-full border-t-[5px] pt-2.5 border-zinc-300">
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
                <PostItem {...PostList[0]} border />
              </Link>
            </div>
            <div className="py-7 px-3">
              <SelectedLocation
                lname={location.lname}
                address={location.address}
              />
            </div>
          </div>
        </>
      ) : (
        <>게시물이 없습니다</>
      )}
    </article>
  );
};
export default HomeHasTagMapSection;
