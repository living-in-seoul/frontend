import { formDataState } from '@/recoil/BoardStates';
import { KeyboardEvent, MouseEvent, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';

interface HandleTagsTypes {
  tagText: string;
  setFormData: (data: any) => void;
  setTagText: (data: string) => void;
}

type AddTagHandler = (
  e:
    | MouseEvent<HTMLButtonElement, MouseEvent>
    | KeyboardEvent<HTMLInputElement>,
) => void;

export const useHandleTags = ({
  tagText,
  setFormData,
  setTagText,
}: HandleTagsTypes) => {
  const formData = useRecoilValue(formDataState);

  const onAddTag: AddTagHandler = useCallback(
    //타입 바꿔라
    (e) => {
      e.preventDefault();

      if (formData.hashTag.length >= 5) {
        toast(' 태그는 최대 5개까지만 입력 가능합니다.', {
          icon: '❕',
          style: {
            borderRadius: '5px',
            background: '#333',
            color: '#fff',
            fontSize: '15px',
          },
        });
        return;
      }

      if (!formData.hashTag.includes(tagText)) {
        setFormData((prev: { hashTag: string[] }) => ({
          ...prev,
          hashTag: [...prev.hashTag, tagText],
        }));
        setTagText('');
      } else {
        alert('중복 태그입니다.');
        setTagText('');
      }
    },
    [formData.hashTag, setFormData, setTagText, tagText],
  );

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddTag(e);
    }
  };

  const onDeleteTag = useCallback(
    (tag: string) => {
      setFormData((prev: { hashTag: string[] }) => ({
        ...prev,
        hashTag: prev.hashTag.filter((t) => t !== tag),
      }));
      setTagText('');
    },
    [setFormData, setTagText],
  );

  return { onAddTag, onDeleteTag, handleKeyPress };
};
