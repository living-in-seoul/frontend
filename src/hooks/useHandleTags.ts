import { formDataState } from '@/recoil/BoardStates';
import { KeyboardEvent, MouseEvent, useCallback } from 'react';
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
