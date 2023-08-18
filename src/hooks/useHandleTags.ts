import { formDataState } from '@/recoil/BoardStates';
import { MouseEvent, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

interface HandleTagsTypes {
  tagText: string;
  setFormData: (data: any) => void;
  setTagText: (data: string) => void;
}

type AddTagHandler = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) => void;

export const useHandleTags = ({
  tagText,
  setFormData,
  setTagText,
}: HandleTagsTypes) => {
  const formData = useRecoilValue(formDataState);

  const onAddTag: AddTagHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  return { onAddTag, onDeleteTag };
};
