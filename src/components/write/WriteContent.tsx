'use client';
import { useHandleTags } from '@/hooks/useHandleTags';
import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import ChooseLocation from '@/components/write/location/ChooseLocation';
import UploadImageModal from '@/components/write/Image/UploadImageModal';
import { ChangeEvent, useState } from 'react';
import Icons from '../common/Icons';
import { closeX, downdrop, hashtagIcon } from '@/utils/Icon';
import UploadImage from './Image/UploadImage';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  ImagePortalState,
  MapPortalState,
  formDataState,
} from '@/recoil/BoardStates';
import SelectCategory from './SelectCategory';
import SelectedLocation from './location/SelectedLocation';
import DisplayTags from './tags/DisplayTags';
import BottomSheet from '../BottomSheet';
import { writeBottomSheetState } from '@/recoil/bottomsheet';

const WriteContent = () => {
  const [formData, setFormData] = useRecoilState(formDataState);
  const [tagText, setTagText] = useState<string>('');
  const [isBottomSheetOpen, setisBottomSheetState] = useRecoilState(
    writeBottomSheetState,
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const setImagePortalState = useSetRecoilState(MapPortalState);
  const [openImagePortal, setOpenImagePortal] =
    useRecoilState(ImagePortalState);
  const [openMapPortal, setOpenMapPortal] = useRecoilState(MapPortalState);
  const { handleKeyPress, onDeleteTag } = useHandleTags({
    tagText,
    setFormData,
    setTagText,
  });

  const onSelectOptionHandler = (name: string) => {
    name === '전체' ? setSelectedOption('') : setSelectedOption(name);
    setisBottomSheetState(false);
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

  return (
    <>
      <form className="flex flex-col w-full h-[85vh] justify-between items-center">
        <div
          className="flex justify-center text-sm text-center text-zinc-700 w-[90%] border border-zinc-300 h-8 mt-4 items-center gap-3 rounded-3xl"
          onClick={() => setisBottomSheetState(true)}
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
          <div className="flex justify-center items-center h-full border-t border-stone-300 px-4 w-full text-sm ">
            <div>
              <Icons path={hashtagIcon} fill="#B8B8B8" />
            </div>
            <input
              className="w-full outline-none ml-2.5"
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
      <BottomSheet state={writeBottomSheetState}>
        <SelectCategory
          selectedOption={selectedOption}
          onSelectOptionHandler={onSelectOptionHandler}
        />
      </BottomSheet>
      {openImagePortal && (
        <ModalPortal nodeName="imagePortal">
          <ModalOutside
            className="overflow-hidden p-2 bg-white w-4/5 h-1/4 rounded-2xl max-w-7xl"
            onClose={() => setOpenImagePortal(false)}
          >
            <UploadImageModal onClose={() => setOpenImagePortal(false)} />
          </ModalOutside>
        </ModalPortal>
      )}
      {openMapPortal && (
        <ModalPortal nodeName="mapPortal">
          <ChooseLocation onClose={() => setOpenMapPortal(false)} />
        </ModalPortal>
      )}
    </>
  );
};

export default WriteContent;
