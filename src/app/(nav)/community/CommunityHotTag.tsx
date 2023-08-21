import Select from '@/components/common/Select';
import Link from 'next/link';

interface CommunityHotTag {
  Hottag: string[];
  category: string;
}

const CommunityHotTag = ({ Hottag, category }: CommunityHotTag) => {
  return (
    <section className="w-full border-b py-6">
      <h1 className="w-full text-black py-3 px-4 text-lg font-semibold leading-none">
        현재 HOT한 해시태그
      </h1>
      <ul className="py-3 pl-4 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
        {Hottag.map((tag) => (
          <Link
            key={tag}
            href={`/community/${category}/${tag}`}
            prefetch={false}
          >
            <Select
              title={`#${tag}`}
              key={tag}
              className="rounded-md"
              disable
            />
          </Link>
        ))}
      </ul>
    </section>
  );
};
export default CommunityHotTag;
