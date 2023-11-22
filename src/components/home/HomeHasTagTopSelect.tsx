'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Select from '../common/Select';
interface HomeReviewSectionProps {
  HotTagReview: string[];
}
export const MockSelectBtn = () => (
  <li className="skeleton w-20 py-0.5 px-5 bg-gray-300 rounded-md font-normal justify-center items-center gap-2.5 inline-flex border-[1.125px] border-gray5">
    <span className="text-xs font-normal leading-7 text-gray4">Loading...</span>
  </li>
);

const HomeHasTagTopSelect = ({ HotTagReview }: HomeReviewSectionProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const hashtags = searchParams.get('pop') ?? '';
  const { replace } = useRouter();

  const paramsHandler = (item: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('pop', item);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className="pl-4 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
      {HotTagReview?.map((item) => (
        <li key={item} onClick={() => paramsHandler(item)}>
          <Select
            title={`#${item}`}
            className="rounded-md"
            disable
            selectTag={item === hashtags}
          />
        </li>
      ))}
    </ul>
  );
};
export default HomeHasTagTopSelect;
