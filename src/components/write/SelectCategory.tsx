import { checked } from '@/utils/Icon';
import Icons from '../common/Icons';
import { LINK_NAME } from '@/utils/constants/board';

interface SelectCategoryProp {
  selectedOption: string | null;
  onSelectOptionHandler: (data: string) => void;
}

const SelectCategory = ({
  selectedOption,
  onSelectOptionHandler,
}: SelectCategoryProp) => {
  return (
    <div className="flex flex-col px-4 pt-2 h-full">
      <span className="w-full text-[1.15rem] font-semibold mb-5 px-2">
        주제 선택
      </span>
      <div className="flex flex-col justify-between h-full">
        {LINK_NAME.slice(1).map(({ name }, idx) => {
          const selected = selectedOption === name;
          return (
            <div
              className="flex justify-between items-center w-full h-full py-1.5 cursor-pointer px-2 "
              key={idx}
            >
              <span
                className={` text-base  w-[95%] h-full my-1 ${
                  !selected && selectedOption && `text-zinc-400`
                }`}
                onClick={() => onSelectOptionHandler(name)}
              >
                {name}
              </span>
              <span className=" h-full ">
                {selected && <Icons path={checked} fill="#2DDA80" />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectCategory;
