'use client';
import Select from '@/components/common/Select';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface CommunityHotTag {
  Hottag: string[];
  category: string;
}

const CommunityHotTag = ({ Hottag, category }: CommunityHotTag) => {
  const searchParams = useSearchParams();
  const tagActive = searchParams.get('tag');

  return (
    <section className="w-full border-b py-6">
      <h1 className="w-full text-black py-3 px-4 text-lg font-semibold leading-none">
        현재 HOT한 해시태그
      </h1>
      <ul className="py-3 pl-4 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
        {Hottag ? (
          Hottag?.map((tag) => (
            <Link
              key={tag}
              href={`/community?category=${category}&tag=${tag}`}
              scroll
            >
              <Select
                title={`#${tag}`}
                key={tag}
                className="rounded-md"
                disable
                selectTag={tagActive === tag}
              />
            </Link>
          ))
        ) : (
          <>비어있어요</>
        )}
      </ul>
    </section>
  );
};
export default CommunityHotTag;
