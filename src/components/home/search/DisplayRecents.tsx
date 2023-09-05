'use client';
import DisplayTags from '@/components/write/tags/DisplayTags';
import { recentLocationState } from '@/recoil/mapStates';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

const DisplayRecents = () => {
  const [placeData, setPlaceData] = useRecoilState(recentLocationState);

  const onDeleteTag = useCallback(
    (tag: string) => {
      setPlaceData((prev) => prev.filter((t) => t !== tag));
    },
    [setPlaceData],
  );

  return (
    <div>
      <DisplayTags tags={placeData} onDeleteTag={onDeleteTag} />
    </div>
  );
};

export default DisplayRecents;
