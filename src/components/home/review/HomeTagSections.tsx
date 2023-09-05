'use client';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import Select from '../../common/Select';
import { HomeReviewKeyState } from '@/recoil/homeState';

interface HomeTagSectionsProps {
  HotTagReview: string[];
  hashtags: string;
}
const HomeTagSections = ({ HotTagReview, hashtags }: HomeTagSectionsProps) => {
  const setSelectTagsValue = useSetRecoilState(HomeReviewKeyState);
  const Hashtag = useRecoilValue(HomeReviewKeyState) ?? hashtags;
  const onSelctChangeListHandler = (HotTagReview: string) => {
    setSelectTagsValue(HotTagReview);
  };
  return (
    <ul className="pl-4 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
      {HotTagReview?.map((item) => (
        <li key={item}>
          <Select
            title={`#${item}`}
            className="rounded-md cursor-pointer active:bg-slate-300"
            onClick={() => onSelctChangeListHandler(item)}
            selectTag={item === Hashtag}
          />
        </li>
      ))}
    </ul>
  );
};
export default HomeTagSections;
