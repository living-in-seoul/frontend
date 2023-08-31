'use client';
import Link from 'next/link';
import useSWR from 'swr';
import { useRecoilValue } from 'recoil';
import { HomeHomeTownKeyState, HomeReviewKeyState } from '@/recoil/homeState';
import CarouselProvider from '@/context/CarouselProvider';
import PostItem from '@/components/community/PostItem';
interface ReviewListProps {
  hashtags: string;
}

const HomeHomeTownLists = ({ hashtags }: ReviewListProps) => {
  const Hashtag = useRecoilValue(HomeHomeTownKeyState) ?? hashtags;
  const { data: PostList } = useSWR<ResponsePost[]>(
    `/api/home/hometown?hashtag=${Hashtag}`,
    { suspense: true },
  );
  const groupedItems = PostList
    ? [...Array(Math.ceil(PostList.length / 2))].map((_, idx) =>
        PostList.slice(idx * 2, idx * 2 + 2),
      )
    : [];

  return (
    <CarouselProvider>
      {groupedItems.map((group, groupIndex) => (
        <div key={groupIndex} className="groupContainer">
          {group.map((item) => (
            <Link
              key={item.post.postId}
              onMouseDown={(e) => e.preventDefault()}
              href={`/detail/${item.post.postId}`}
              className="w-full cursor-pointer hover:bg-zinc-200 transition-all duration-200 active:bg-zinc-200"
            >
              <PostItem key={item.post.postId} {...item} />
            </Link>
          ))}
        </div>
      ))}
    </CarouselProvider>
  );
};
export default HomeHomeTownLists;
