'use client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Select from '../../common/Select';
import { HomeHomeTownKeyState } from '@/recoil/homeState';

interface HomeTagSectionsProps {
  HotTagHometownTag: string[];
  hashtags: string;
}
const HomeTownTagSections = ({
  HotTagHometownTag,
  hashtags,
}: HomeTagSectionsProps) => {
  const setSelectTagsValue = useSetRecoilState(HomeHomeTownKeyState);
  const Hashtag = useRecoilValue(HomeHomeTownKeyState) ?? hashtags;
  const onSelctChangeListHandler = (HotTagHometownTag: string) => {
    setSelectTagsValue(HotTagHometownTag);
  };
  return (
    <ul className="pl-4 gap-2.5 flex whitespace-nowrap scrollbar-hide overflow-x-auto">
      {HotTagHometownTag?.map((item) => (
        <Select
          key={item}
          title={`#${item}`}
          className="rounded-md cursor-pointer active:bg-slate-300"
          onClick={() => onSelctChangeListHandler(item)}
          selectTag={item === Hashtag}
        />
      ))}
    </ul>
  );
};
export default HomeTownTagSections;
