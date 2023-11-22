'use client';
import Select from '@/components/common/Select';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface CommunityHotTag {
  Hottag: string[];
  category: string;
}

const CommunityHotTag = ({ Hottag }: CommunityHotTag) => {
  const params = useSearchParams();
  const tagActive = params?.get('tag');
  const pathname = usePathname();
  const { replace } = useRouter();

  const paramsRouteHandle = (item: string) => {
    const searchParams = new URLSearchParams(params);
    console.log(`${pathname}?${searchParams.toString()}`);
    searchParams.set('tag', item);
    replace(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <section className="w-full border-b py-6">
      <h1 className="w-full text-gray1 py-3 px-4 text-lg font-semibold leading-none">
        현재 HOT한 해시태그
      </h1>
      <ul className="py-3 pl-4 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
        {Hottag ? (
          Hottag?.map((tag) => (
            <li key={tag} onClick={() => paramsRouteHandle(tag)}>
              <Select
                title={`#${tag}`}
                key={tag}
                className="rounded-md"
                disable
                selectTag={tagActive === tag}
              />
            </li>
          ))
        ) : (
          <>비어있어요</>
        )}
      </ul>
    </section>
  );
};
export default CommunityHotTag;
