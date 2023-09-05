'use client';
import { useHandleTags } from '@/hooks/useHandleTags';
import ModalOutside from '@/components/modal/ModalOutside';
import ModalPortal from '@/components/modal/ModalPortal';
import ChooseLocation from '@/components/write/location/ChooseLocation';
import UploadImageModal from '@/components/write/Image/UploadImageModal';
import { ChangeEvent, useState } from 'react';
import Icons from '../common/Icons';
import { downdrop, hashtagIcon } from '@/utils/Icon';
import UploadImage from './Image/UploadImage';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  ImagePortalState,
  MapPortalState,
  formDataState,
} from '@/recoil/BoardStates';
import SelectedLocation from './location/SelectedLocation';
import DisplayTags from './tags/DisplayTags';
import { bottomSheetState, writeBottomSheetState } from '@/recoil/bottomsheet';
import { Toaster } from 'react-hot-toast';

const WriteContent = () => {
  const [formData, setFormData] = useRecoilState(formDataState);
  const [tagText, setTagText] = useState<string>('');
  const [openImagePortal, setOpenImagePortal] =
    useRecoilState(ImagePortalState);
  const [openMapPortal, setOpenMapPortal] = useRecoilState(MapPortalState);
  const setImagePortalState = useSetRecoilState(MapPortalState);
  const [bottomSheet, setBottomSheetState] = useRecoilState(bottomSheetState);
  const { isActive, type, selectedOption } = bottomSheet;
  const { handleKeyPress, onDeleteTag } = useHandleTags({
    tagText,
    setFormData,
    setTagText,
  });

  const onBottomSheetOnHandler = () => {
    setBottomSheetState((prev) => ({
      type: 'write',
      link: null,
      isActive: true,
      selectedOption: null,
    }));
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
          className="flex justify-center text-sm text-center text-zinc-700 w-[90%] border border-zinc-400 h-8 mt-4 items-center gap-3 rounded-3xl cursor-pointer"
          onClick={onBottomSheetOnHandler}
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
        <div className="flex flex-col w-full h-[16%] ">
          <div className="flex justify-center items-center h-full border-t border-stone-300 px-5 w-full text-sm ">
            <div>
              <Icons path={hashtagIcon} fill="#2DDAB0" />
            </div>
            <div className="w-full flex text-xs">
              <DisplayTags tags={formData.hashTag} onDeleteTag={onDeleteTag} />
              <input
                className=" outline-none "
                value={tagText}
                onChange={(e) => onChangeTag(e)}
                onKeyPress={(e) => handleKeyPress(e)}
                placeholder="#태그 입력(최대 5개)"
              />
            </div>
          </div>
          <div
            className="flex px-2 justify-start gap-2 items-center h-full border-t border-b border-stone-300 text-xs text-gray-400 w-full hover:cursor-pointer"
            onClick={() => setImagePortalState(true)}
          >
            <SelectedLocation onWrite={true} />
          </div>
        </div>
        <div className="w-full px-5">
          <UploadImage />
        </div>
      </form>
      {openImagePortal && (
        <ModalPortal nodeName="imagePortal">
          <ModalOutside
            className=" w-full bottom-0 max-w-md h-[120px] "
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
      <Toaster />
    </>
  );
};

export default WriteContent;
