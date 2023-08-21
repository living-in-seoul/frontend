'use client';
import { useHandleTags } from '@/hooks/useHandleTags';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import Icons from '../common/Icons';
import { checked, downdrop } from '@/utils/Icon';
import MapBottomSheet from '../map/bottomsheet/MapBottomSheet';
import { BoardOptions } from '@/utils/constants/board';
import UploadImage from './UploadImage';
import { useRecoilState } from 'recoil';
import { ImageState } from '@/recoil/BoardStates';

type WriteFormTypes = Omit<RequestBoardWrite, 'postImg'>;

const WriteContent = () => {
  const [formData, setFormData] = useState<WriteFormTypes>({
    category: '',
    hashTag: [],
    content: '',
    location: {
      lat: 37.5519,
      lng: 126.9918,
    },
  });
  const [tagText, setTagText] = useState<string>('');
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { onAddTag, onDeleteTag } = useHandleTags({
    tagText,
    setFormData,
    setTagText,
  });
  const [imageState, setImageState] = useRecoilState(ImageState);

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
        location: formData.location,
      };

      data.append(
        'post',
        new Blob([JSON.stringify(post)], { type: 'application/json' }),
      );
      if (imageState) {
        for (let file of imageState) {
          data.append('photos', file);
        }
      }
      await fetch(`/api/write`, {
        method: 'POST',
        body: data,
      });
    },
    [formData],
  );

  return (
    <>
      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="flex flex-col mt-2 w-full h-full justify-center items-center"
      >
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
          className="w-[95%] h-full text-sm p-3 outline-none"
          name="content"
          placeholder="서울바이벌 이웃들과 자유롭게 소통해보세요!"
          rows={15}
          value={formData.content}
          onChange={(e) => onChangeInputHandler(e)}
        />
        <UploadImage />
        <div className="flex ">
          <input
            name="locationTag"
            value={tagText}
            onChange={(e) => onChangeTag(e)}
            placeholder="장소 태그"
          />
          <button name="locationTagButton" onClick={onAddTag}>
            추가
          </button>
        </div>
        <div>
          {/* 야 키 중복 제거 해라 꼭 좀*/}
          {formData.hashTag.map((tag, _) => (
            <div key={tag} onClick={() => onDeleteTag(tag)}>
              #{tag}
            </div>
          ))}
        </div>
        <button type="submit">글 작성</button>
      </form>
      {openSelect && (
        <MapBottomSheet fixed>
          <div className="flex flex-col gap-1.5 px-4 h-full">
            <span className="w-full text-[1.1rem] font-semibold mb-2.5">
              주제 선택
            </span>
            <div className="flex flex-col justify-between  h-full">
              {BoardOptions.map((option, idx) => {
                const selected = selectedOption === option;
                return (
                  <div
                    className="flex justify-around items-center w-full h-full  "
                    key={idx}
                  >
                    <span
                      className={`text-xs w-[95%] h-full my-0.5 ${
                        !selected && selectedOption && `text-zinc-400`
                      }`}
                      onClick={() => onSelectOptionHandler(idx)}
                    >
                      {option}
                    </span>
                    <span className="w-[5%] h-full text-zinc-600">
                      {selected && <Icons path={checked} />}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </MapBottomSheet>
      )}
    </>
  );
};

export default WriteContent;
