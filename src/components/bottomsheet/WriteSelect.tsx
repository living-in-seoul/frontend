'use client';
import { bottomSheetState } from '@/recoil/bottomsheet';
import { useRecoilState, useSetRecoilState } from 'recoil';
import SelectCategory from '../write/SelectCategory';
import { formDataState } from '@/recoil/BoardStates';

const WriteSelect = () => {
  const [bottomSheetInfo, setBottomSheetState] =
    useRecoilState(bottomSheetState);
  const setFormData = useSetRecoilState(formDataState);

  const handleOptionChange = (newOption: string) => {
    setFormData((prev) => ({ ...prev, category: newOption }));
    setBottomSheetState({
      ...bottomSheetInfo,
      isActive: false,
      selectedOption: newOption,
    });
  };
  return (
    <SelectCategory
      selectedOption={bottomSheetInfo.selectedOption}
      onSelectOptionHandler={handleOptionChange}
    />
  );
};
export default WriteSelect;
