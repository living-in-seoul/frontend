'use client';
import InsertTagItem from './InsertTagItem';
import useSWR from 'swr';
const HashtagInsert = () => {
  const { data: InsertTag, error } = useSWR<string[]>('/api/alert');

  return (
    <>
      <div className="flex gap-1.5 pt-7 pb-5 items-center">
        <span className="text-stone-900 text-base font-bold leading-none">
          등록된 해시태그
        </span>
        <div className="w-40">
          <span className="text-gray4 text-xs font-semibold leading-none">
            {InsertTag && InsertTag.length}
          </span>
          <span className="text-gray4 text-xs font-normal leading-none">
            /15
          </span>
        </div>
      </div>
      <ul className="py-3 pl-4 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
        {InsertTag ? (
          InsertTag?.map((tag) => <InsertTagItem tag={tag} key={tag} />)
        ) : (
          <li>비어있어요</li>
        )}
      </ul>
    </>
  );
};
export default HashtagInsert;
