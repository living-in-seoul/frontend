import { checked } from '@/utils/Icon';
import { BoardOptions } from '@/utils/constants/board';
import Icons from '../common/Icons';

interface SelectCategoryProp {
  selectedOption: string | null;
  onSelectOptionHandler: (data: number) => void;
}

const SelectCategory = ({
  selectedOption,
  onSelectOptionHandler,
}: SelectCategoryProp) => {
  return (
    <div className="flex flex-col gap-1.5 px-4 h-full">
      <span className="w-full text-[1.3rem] font-semibold mb-2.5">
        주제 선택
      </span>
      <div className="flex flex-col justify-between  h-full">
        {BoardOptions.map((option, idx) => {
          const selected = selectedOption === option;
          return (
            <div
              className="flex justify-around items-center w-full h-full "
              key={idx}
            >
              <span
                className={` text-[1.12rem]  w-[95%] h-full my-0.5 ${
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
  );
};

export default SelectCategory;
