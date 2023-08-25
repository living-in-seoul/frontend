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
    <div className="flex flex-col gap-1.5 px-4 h-full">
      <span className="w-full text-[1.15rem] font-semibold mb-2.5">
        주제 선택
      </span>
      <div className="flex flex-col justify-between  h-full">
        {LINK_NAME.map(({ name, link }, idx) => {
          console.log(name, link);
          const selected = selectedOption === name;
          return (
            <div
              className="flex justify-around items-center w-full h-full "
              key={idx}
            >
              <span
                className={` text-[0.9rem]  w-[95%] h-full my-0.5 ${
                  !selected && selectedOption && `text-zinc-400`
                }`}
                onClick={() => onSelectOptionHandler(name)}
              >
                {name}
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
