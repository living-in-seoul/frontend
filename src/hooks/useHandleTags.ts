import { useCallback } from 'react';

interface HandleTagsTypes {
  tagText: string;
  setFormData: (data: any) => void;
  setTagText: (data: string) => void;
}

export const useHandleTags = ({
  tagText,
  setFormData,
  setTagText,
}: HandleTagsTypes) => {
  const onAddTag = useCallback(() => {
    setFormData((prev: { hashTag: string[] }) => ({
      ...prev,
      hashTag: [...prev.hashTag, tagText],
    }));
    setTagText('');
  }, [setFormData, setTagText, tagText]);

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
