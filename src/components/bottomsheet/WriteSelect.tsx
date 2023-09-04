'use client';
import { bottomSheetState } from '@/recoil/bottomsheet';
import { useRecoilState } from 'recoil';
import SelectCategory from '../write/SelectCategory';

const WriteSelect = () => {
  const [bottomSheetInfo, setBottomSheetState] =
    useRecoilState(bottomSheetState);

  const handleOptionChange = (newOption: string) => {
    setBottomSheetState({ ...bottomSheetInfo, selectedOption: newOption });
  };
  return (
    <SelectCategory
      selectedOption={bottomSheetInfo.selectedOption}
      onSelectOptionHandler={handleOptionChange}
    />
  );
};
export default WriteSelect;
