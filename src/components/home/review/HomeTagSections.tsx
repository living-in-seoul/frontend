'use client';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import Select from '../../common/Select';
import { HomeReviewKeyState } from '@/recoil/homeState';
import DisplayTagItem from '@/components/write/tags/DisplayTagItem';
import Icons from '@/components/common/Icons';
import { closeX } from '@/utils/Icon';

interface HomeTagSectionsProps {
  HotTagReview: string[];
  hashtags?: string;
  type?: 'tags' | 'locations';
}
const HomeTagSections = ({
  HotTagReview,
  hashtags,
  type = 'tags',
}: HomeTagSectionsProps) => {
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
            title={type === 'locations' ? item : `#${item}`}
            className="rounded-md cursor-pointer active:bg-slate-300"
            onClick={() => onSelctChangeListHandler(item)}
            selectTag={item === Hashtag}
            Icon={
              type === 'locations' ? (
                <Icons
                  path={closeX}
                  option={{
                    stroke: '#787878',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                  }}
                />
              ) : null
            }
          />
        </li>
      ))}
    </ul>
  );
};
export default HomeTagSections;
