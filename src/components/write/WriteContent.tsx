'use client';
import { useHandleTags } from '@/hooks/useHandleTags';
import { ChangeEvent, useState, useCallback, FormEvent } from 'react';
import Icons from '../common/Icons';
import { downdrop } from '@/utils/Icon';
import MapBottomSheet from '../map/bottomsheet/MapBottomSheet';
import { BoardOptions } from '@/utils/constants/board';
import UploadImage from './UploadImage';
import { useRecoilState } from 'recoil';
import { formDataState } from '@/recoil/BoardStates';
import SelectCategory from './SelectCategory';

const WriteContent = () => {
  const [formData, setFormData] = useRecoilState(formDataState);
  const [tagText, setTagText] = useState<string>('');
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { onAddTag, onDeleteTag } = useHandleTags({
    tagText,
    setFormData,
    setTagText,
  });
  const onSelectOptionHandler = (idx: number) => {
    setOpenSelect(false);
    setSelectedOption(BoardOptions[idx]);
    setFormData((prev) => ({ ...prev, category: BoardOptions[idx] }));
  };

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
  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData();

      const post = {
        category: formData.category,
        content: formData.content,
        hashtag: '#' + formData.hashTag.join('#'),
        // location: formData.location,
      };

      data.append(
        'post',
        new Blob([JSON.stringify(post)], { type: 'application/json' }),
      );
      // if (imageState) {
      //   for (let file of imageState) {
      //     data.append('photos', file);
      //   }
      // }
      await fetch(`/api/write`, {
        method: 'POST',
        body: data,
      });
    },
    [formData],
  );

  return (
    <>
      <form className="flex flex-col mt-2 w-full h-full justify-center items-center">
        <div
          className="flex justify-center text-xs text-center text-zinc-700 w-[90%] mb-5 border border-zinc-300 h-7 items-center gap-3 rounded-2xl"
          onClick={onOpenCategories}
        >
          <span>
            {selectedOption ? selectedOption : '주제를 선택해 주세요.'}
          </span>
          <Icons path={downdrop} />
        </div>
        <textarea
          name="content"
          className="w-[95%] h-full text-sm p-3 outline-none"
          placeholder="서울바이벌 이웃들과 자유롭게 소통해보세요!"
          rows={15}
          value={formData.content}
          onChange={(e) => onChangeInputHandler(e)}
        />
        <UploadImage />
        <div className="mt-10 w-full px-6 ">
          <input
            value={tagText}
            onChange={(e) => onChangeTag(e)}
            placeholder="장소 태그"
          />
          {/* any바꾸삼 */}
          <button onClick={(e: any) => onAddTag(e)}>태그 추가</button>
        </div>
        <div className="flex gap-3 w-full mt-2 px-6">
          {formData.hashTag.map((tag, _) => (
            <div
              className="bg-neutral-200 rounded-xl px-2 text-xs"
              key={tag}
              onClick={() => onDeleteTag(tag)}
            >
              #{tag}
            </div>
          ))}
        </div>
      </form>
      {openSelect && (
        <MapBottomSheet fixed>
          <SelectCategory
            selectedOption={selectedOption}
            onSelectOptionHandler={onSelectOptionHandler}
          />
        </MapBottomSheet>
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
      >
        asdfasdf
      </button>
    </>
  );
};

export default WriteContent;
