'use client';
import { useHandleTags } from '@/hooks/useHandleTags';
import { ChangeEvent, useState } from 'react';
import Icons from '../common/Icons';
import { closeX, downdrop, tags } from '@/utils/Icon';
import MapBottomSheet from '../map/bottomsheet/MapBottomSheet';
import UploadImage from './Image/UploadImage';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { MapPortalState, formDataState } from '@/recoil/BoardStates';
import SelectCategory from './SelectCategory';
import SelectedLocation from './location/SelectedLocation';
import DisplayTags from './tags/DisplayTags';

const WriteContent = () => {
  const [formData, setFormData] = useRecoilState(formDataState);
  const [tagText, setTagText] = useState<string>('');
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const setImagePortalState = useSetRecoilState(MapPortalState);
  const { handleKeyPress, onDeleteTag } = useHandleTags({
    tagText,
    setFormData,
    setTagText,
  });

  const onSelectOptionHandler = (name: string) => {
    name === '전체' ? setSelectedOption('') : setSelectedOption(name);
    setOpenSelect(false);
    setFormData((prev) => ({ ...prev, category: name }));
  };

  const onChangeInputHandler = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    setTagText(e.target.value);
  };

  console.log(formData);

  return (
    <>
      <form className="flex flex-col w-full h-[85vh] justify-between items-center">
        <div
          className="flex justify-center text-sm text-center text-zinc-700 w-[90%] border border-zinc-300 h-8 mt-4 items-center gap-3 rounded-3xl"
          onClick={() => setOpenSelect(true)}
        >
          {selectedOption ? selectedOption : '주제를 선택해 주세요.'}
          <Icons path={downdrop} />
        </div>
        <textarea
          name="content"
          className="w-full h-full max-h-[55%] text-base px-4 outline-none "
          placeholder="서울바이벌 이웃들과 자유롭게 소통해 보세요!"
          rows={8}
          value={formData.content}
          onChange={(e) => onChangeInputHandler(e)}
        />
        <div className="flex flex-col w-full h-[16%]">
          <div className="flex justify-center items-center h-full border-t border-stone-300 px-5 w-full text-sm ">
            <Icons path={tags} fill="none" option={{ stroke: '#B8B8B8' }} />
            <input
              className="h-full w-36 outline-none ml-4"
              value={tagText}
              onChange={(e) => onChangeTag(e)}
              onKeyPress={(e) => handleKeyPress(e)}
              placeholder="#해시태그를 입력해주세요"
            />
            <DisplayTags tags={formData.hashTag} onDeleteTag={onDeleteTag} />
          </div>
          <div
            className="flex justify-start gap-2 items-center h-full border-t border-b border-stone-300 text-xs text-gray-400 px-4 w-full hover:cursor-pointer"
            onClick={() => setImagePortalState(true)}
          >
            <SelectedLocation />
            <Icons
              path={closeX}
              option={{
                stroke: '#787878',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              }}
            />
          </div>
        </div>
        <div className="w-full px-5">
          <UploadImage />
        </div>
      </form>
      {openSelect && (
        <>
          <div
            className="fixed top-0 left-0 w-[100%] h-[100%] bg-black opacity-40 "
            onClick={() => setOpenSelect(false)}
          ></div>
          <MapBottomSheet fixed>
            <SelectCategory
              selectedOption={selectedOption}
              onSelectOptionHandler={onSelectOptionHandler}
            />
          </MapBottomSheet>
        </>
      )}
    </>
  );
};

export default WriteContent;
