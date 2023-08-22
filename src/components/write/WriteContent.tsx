'use client';
import { useHandleTags } from '@/hooks/useHandleTags';
import {
  ChangeEvent,
  useState,
  useCallback,
  FormEvent,
  useEffect,
} from 'react';
import Icons from '../common/Icons';
import { downdrop, location, tags } from '@/utils/Icon';
import MapBottomSheet from '../map/bottomsheet/MapBottomSheet';
import { BoardOptions } from '@/utils/constants/board';
import UploadImage from './UploadImage';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { MapPortalState, formDataState } from '@/recoil/BoardStates';
import SelectCategory from './SelectCategory';

const WriteContent = () => {
  const [formData, setFormData] = useRecoilState(formDataState);
  const [tagText, setTagText] = useState<string>('');
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const setImagePortalState = useSetRecoilState(MapPortalState);
  const { handleKeyPress, onAddTag, onDeleteTag } = useHandleTags({
    tagText,
    setFormData,
    setTagText,
  });
  const onSelectOptionHandler = (idx: number) => {
    setOpenSelect(false);
    setSelectedOption(BoardOptions[idx]);
    setFormData((prev) => ({ ...prev, category: BoardOptions[idx] }));
  };
  useEffect(() => console.log(formData), [formData]);

  const onOpenCategories = () => {
    setOpenSelect(true);
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
      <form className="flex flex-col mt-2 w-full h-full justify-center items-center">
        <div
          className="flex justify-center text-sm text-center text-zinc-700 w-[90%] mb-5 border border-zinc-300 h-7 items-center gap-3 rounded-2xl"
          onClick={onOpenCategories}
        >
          <span>
            {selectedOption ? selectedOption : '주제를 선택해 주세요.'}
          </span>
          <Icons path={downdrop} />
        </div>
        <textarea
          name="content"
          className="w-[95%] h-full text-base p-3 outline-none"
          placeholder="서울바이벌 이웃들과 자유롭게 소통해 보세요!"
          rows={12}
          value={formData.content}
          onChange={(e) => onChangeInputHandler(e)}
        />
        <div className="flex justify-start items-center h-14 border-t border-stone-200 px-4 w-full text-xs">
          <Icons path={tags} fill="none" option={{ stroke: '#B8B8B8' }} />
          <input
            className="h-10 outline-none ml-3"
            value={tagText}
            onChange={(e) => onChangeTag(e)}
            onKeyPress={(e) => handleKeyPress(e)}
            placeholder="#해시태그를 입력해주세요"
          />
          <div className="flex gap-1 w-full  pl-3">
            {formData.hashTag.map((tag, _) => (
              <div
                className="bg-neutral-200 rounded-xl px-2 text-sm text-neutral-600"
                key={tag}
                onClick={() => onDeleteTag(tag)}
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex justify-start gap-2 items-center h-14 border-t border-b border-stone-200 text-xs text-gray-400 px-4 w-full mb-2 hover:cursor-pointer"
          onClick={() => setImagePortalState(true)}
        >
          <Icons
            path={location}
            fill="none"
            option={{ stroke: '#B8B8B8', strokeWidth: 1.5 }}
          />
          <span> 공유할 위치를 선택해 주세요</span>
        </div>
        <UploadImage />
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
      <button
        onClick={async () => {
          const accessToken = localStorage.getItem('accessToken');
          return await fetch('/api/write?code=r', {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              authorization: 'Bearer ' + accessToken,
            },
          }).then((response) => response.json());
        }}
      ></button>
    </>
  );
};

export default WriteContent;
