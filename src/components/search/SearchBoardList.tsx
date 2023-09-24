'use client';
import { useEffect, useState } from 'react';
import useObserver from '@/hooks/useObserver';
import { useSearchParams } from 'next/navigation';
import PostItem from '../community/PostItem';
import PostItemSkeleton from '../community/PostItemSkeleton';
import { v4 as uuidv4 } from 'uuid';
import NoneItem from '../NoneItem';

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
  const [listTotalPage, setlistTotalPage] = useState<number>(
    totalpage as number,
  );
  const [lastItem, setLastItem] = useState(false);
  const searchParams = useSearchParams();
  const searchValue = searchParams?.get('search') ?? '';

  useEffect(() => {
    if (listTotalPage === page || totalpage === 0) {
      setLastItem(true);
    }
  }, [listTotalPage, page, totalpage]);

  const loadMoreList = async () => {
    setIsLoading(true);

    if (listTotalPage === page || listTotalPage === null) {
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
    <article className="relative flex flex-col" key={uuidv4()}>
      {totalpage !== 0 ? (
        list?.map((post) => (
          <PostItem
            category={Category}
            {...post}
            key={post.post.postId + uuidv4()}
          />
        ))
      ) : (
        <NoneItem
          description="새로운 소식이 없습니다"
          // title="서울바이벌에서의 모든 활동내역을 알려드립니다"
        />
      )}

      {lastItem ? (
        <div></div>
      ) : (
        <div ref={ref} className="flex flex-col sm:col-span-2 ">
          <PostItemSkeleton />
          <PostItemSkeleton />
          <PostItemSkeleton />
        </div>
      )}
    </article>
  );
};
export default SearchBoardList;
