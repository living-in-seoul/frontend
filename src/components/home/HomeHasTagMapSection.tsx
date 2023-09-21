'use client';
import Link from 'next/link';
import HomeSectionTitle from './HomeSectionTitle';
import Select from '@/components/common/Select';
import PostItem from '@/components/community/PostItem';
import MapProvider from '@/context/MapProvider';
import dynamic from 'next/dynamic';
import SelectedLocation from '../write/location/SelectedLocation';
import { Suspense, useEffect, useState } from 'react';

const DynamicMap = dynamic(() => import('./HomeHashtagMap'), {
  ssr: false,
});

interface HomeReviewSectionProps {
  HotTagReview: string[];
}

const HomeHasTagMapSection = ({ HotTagReview }: HomeReviewSectionProps) => {
  const [hashtags, setHashTags] = useState(HotTagReview[0]);
  const [postList, setPostList] = useState<ResponsePost[] | null>(null);

  useEffect(() => {
    if (hashtags) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/tags/posts?category=&page=1&size=1&hashtagName=${hashtags}&type=popular`,
      )
        .then((res) => res.json())
        .then((res) => {
          setPostList(res.result);
        });
    }
  }, [hashtags]);
  // const { post, location } = PostList[0];
  const post = postList ? postList[0].post : null;
  const location = postList ? postList[0].location : null;
  return (
    <article className="relative w-full border-t-[5px] pt-2.5 border-zinc-300">
      <HomeSectionTitle title="해시태그 언급이 잦은 장소에요" link="/map" />
      {HotTagReview[0] ? (
        <>
          <ul className="pl-4 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
            {HotTagReview?.map((item) => (
              <li key={item} onClick={() => setHashTags(item)}>
                <Select
                  title={`#${item}`}
                  className="rounded-md"
                  disable
                  selectTag={item === hashtags}
                />
              </li>
            ))}
          </ul>
          {post && location && postList ? (
            <Suspense fallback={<>loading...</>}>
              <>
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
                      <PostItem {...postList[0]} border />
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
            </Suspense>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>게시물이 없습니다</>
      )}
    </article>
  );
};
export default HomeHasTagMapSection;
