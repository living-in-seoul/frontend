'use client';
import { useEffect, useState } from 'react';
import useObserver from '@/hooks/useObserver';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { seole } from '../../../public';
import PostItem from '../community/PostItem';
import PostItemSkeleton from '../community/PostItemSkeleton';
import { v4 as uuidv4 } from 'uuid';

interface CommunityBoardProps {
  title?: string;
  Category: string;
  search?: string | never[] | null;
  firstList: ResponsePost[] | [];
  totalpage: number | never[];
}
const SearchBoardList = ({
  Category,
  search,
  firstList,
  totalpage,
}: CommunityBoardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<ResponsePost[]>(firstList);
  const [page, setPage] = useState(1);
  const [ref, inview] = useObserver();
  const [listTotalPage, setlistTotalPage] = useState(totalpage);
  const [lastItem, setLastItem] = useState(false);
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search') ?? '';
  const loadMoreList = async () => {
    setIsLoading(true);
    if (listTotalPage === page) {
      setIsLoading(false);
      setLastItem(true);
      return;
    }

    const next = page + 1;

    const lists = await fetch(
      `/api/community/search/${next}?category=${Category}&search=${encodeURIComponent(
        searchValue,
      )}`,
    )
      .then<ResponsePost[]>((res) => res.json())
      .finally(() => setIsLoading(false));
    if (lists?.length) {
      setPage(next);
      setList((prev) => [...(prev?.length ? prev : []), ...lists]);
    }
  };
  useEffect(() => {
    if (inview && !isLoading) {
      loadMoreList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inview]);
  return (
    <article className="flex flex-col border-b-4" key={uuidv4()}>
      {list.length !== 0 ? (
        list?.map((post) => (
          <PostItem category={Category} {...post} key={post.post.postId} />
        ))
      ) : (
        <div className="w-full h-[50vh] flex items-center justify-center flex-col">
          <Image src={seole} width={300} height={300} alt="서울이" />
          <span className="font-medium">게시물이 존재하지 않습니다.</span>
        </div>
      )}

      {lastItem ? (
        <div>마지막 아이템입니다 지울것</div>
      ) : (
        <div ref={ref} className="flex flex-col sm:col-span-2 ">
          <PostItemSkeleton />
          <PostItemSkeleton />
          <PostItemSkeleton />
        </div>
      )}
      {/* <CategoryPostList /> */}
    </article>
  );
};
export default SearchBoardList;
