'use client';
import Select from '@/components/common/Select';
import DisplayTags from '@/components/write/tags/DisplayTags';
import { useHandleTags } from '@/hooks/useHandleTags';
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
      <DisplayTags tags={placeData} onDeleteTag={onDeleteTag} location={true} />
    </div>
  );
};

export default DisplayRecents;
