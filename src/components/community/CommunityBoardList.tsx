'use client';
import { fetchCommunity } from '@/actions/fetchCommunity';
import PostItem from './PostItem';
import { v4 as uuidv4 } from 'uuid';
import { Suspense, useEffect, useState } from 'react';
import useObserver from '@/hooks/useObserver';
import PostItemSkeleton from './PostItemSkeleton';
import Select from '../common/Select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface CommunityBoardProps {
  title?: string;
  Category: string;
  tags?: string | never[] | null;
  firstList: ResponsePost[] | [];
  totalpage: number | never[];
  ordertype?: 'newer' | 'popular';
}
const CommunityBoardList = ({
  Category,
  tags,
  firstList,
  totalpage,
  ordertype = 'newer',
}: CommunityBoardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<ResponsePost[]>(firstList);
  const [page, setPage] = useState(1);
  const [ref, inview] = useObserver();
  const [listTotalPage, setlistTotalPage] = useState(totalpage);
  const [lastItem, setLastItem] = useState(false);
  const router = useRouter();
  // console.log(pathname , searchParams.getAll());

  const loadMoreList = async () => {
    const EncodeTag =
      (tags && typeof tags === 'string' && encodeURIComponent(tags)) || '';
    setIsLoading(true);
    if (listTotalPage === page) {
      setIsLoading(false);
      setLastItem(true);
      return;
    }

    const next = page + 1;

    const lists = await fetch(
      `/api/community?page=${next}&category=${Category}&tags=${EncodeTag}&ordertype=${ordertype}`,
    )
      .then<ResponseRegister>((res) => res.json())
      .finally(() => setIsLoading(false));

    if (lists?.result.length) {
      setPage(next);
      setList((prev) => [...(prev?.length ? prev : []), ...lists.result]);
    }
  };
  useEffect(() => {
    if (inview && !isLoading) {
      loadMoreList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inview]);

  return (
    <article className="flex flex-col border-b-4">
      <div className="w-full justify-between flex px-4 py-6 ">
        <div className="flex gap-2.5">
          <Select
            title="최신순"
            onClick={() =>
              router.push(
                `/community?category=${Category ?? 'All'}&tag=${
                  tags ?? ''
                }&ordertype=${'newer'}`,
              )
            }
            selectTag={ordertype === 'newer'}
          />
          <Select
            title="인기순"
            onClick={() =>
              router.push(
                `/community?category=${Category ?? 'All'}&tag=${
                  tags ?? ''
                }&ordertype=${'popular'}`,
              )
            }
            selectTag={ordertype === 'popular'}
          />
        </div>
      </div>
      {/* {isLoading && <Loading></Loading>} */}

      {list?.map((post) => (
        <PostItem
          category={Category}
          tags={tags}
          // isPop={isPop}
          {...post}
          key={post.post.postId}
        />
      ))}
      {/* <PostItemSkeleton /> */}

      {lastItem ? (
        <div>마지막 아이템입니다</div>
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
export default CommunityBoardList;
