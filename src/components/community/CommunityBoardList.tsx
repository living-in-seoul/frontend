'use client';
import { useEffect, useState } from 'react';
import useObserver from '@/hooks/useObserver';
import PostItemSkeleton from './PostItemSkeleton';
import Select from '../common/Select';
import { useRouter } from 'next-nprogress-bar';
import CommunityPostItem from './CommunityPostItem';
interface CommunityBoardProps {
  title?: string;
  Category: string;
  tags?: string | never[] | null;
  firstList: ResponsePost[] | [];
  totalpage: number | never[];
  ordertype?: SelectPopType;
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

  const handleSelectClick = (orderType: SelectPopType) => {
    router.replace(
      `/community?category=${Category ?? 'All'}&tag=${
        tags ?? ''
      }&ordertype=${orderType}`,
    );
  };

  const loadMoreList = async () => {
    if (listTotalPage === page) {
      setIsLoading(false);
      setLastItem(true);
      return;
    }

    setIsLoading(true);
    const next = page + 1;
    const EncodeTag =
      (tags && typeof tags === 'string' && encodeURIComponent(tags)) || '';

    try {
      const response = await fetch(
        `/api/community?page=${next}&category=${Category}&tags=${EncodeTag}&ordertype=${ordertype}`,
      );
      const lists: ResponseRegister = await response.json();

      if (lists?.result.length) {
        setPage(next);
        setList((prev) => [...prev, ...lists.result]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inview && !isLoading) {
      loadMoreList();
    }
  }, [inview]);

  return (
    <article className="flex flex-col">
      <div className="w-full justify-between flex px-4 py-6 ">
        <div className="flex gap-2.5">
          <Select
            title="최신순"
            onClick={() => handleSelectClick('newer')}
            selectTag={ordertype === 'newer'}
          />
          <Select
            title="인기순"
            onClick={() => handleSelectClick('popular')}
            selectTag={ordertype === 'popular'}
          />
        </div>
      </div>

      {list.map((post) => (
        <div
          key={post.post.postId}
          onClick={() =>
            router.push(
              `/detail/${post.post.postId}`,
              {},
              { showProgressBar: true },
            )
          }
          className="cursor-pointer hover:bg-slate-100 active:bg-sky-200 transition-all duration-300 rounded-md "
        >
          <CommunityPostItem
            userImg={post.user.userImg}
            category={Category}
            tags={tags}
            {...post}
          />
        </div>
      ))}

      {!lastItem && (
        <div ref={ref} className="flex flex-col sm:col-span-2 ">
          <PostItemSkeleton />
          <PostItemSkeleton />
          <PostItemSkeleton />
        </div>
      )}
    </article>
  );
};
export default CommunityBoardList;
