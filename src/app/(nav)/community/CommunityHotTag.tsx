import Select from '@/components/common/Select';
import Link from 'next/link';

interface CommunityHotTag {
  Hottag: string[];
  category: string;
}

const CommunityHotTag = ({ Hottag, category }: CommunityHotTag) => {
  return (
    <section className="w-full border-b px-4 py-6">
      <h1 className="w-40 text-black py-3 text-lg font-semibold leading-none">
        현재 HOT한 해시태그
      </h1>
      <ul className="py-3 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
        {Hottag.map((tag) => (
          <Link
            key={tag}
            prefetch={false}
            href={`/community/${category}/${tag}`}
          >
            <Select title={`#${tag}`} key={tag} className="rounded-md" />
          </Link>
        ))}
      </ul>
    </section>
  );
};
export default CommunityHotTag;
