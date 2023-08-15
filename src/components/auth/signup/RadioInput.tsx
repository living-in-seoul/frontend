interface RadioInputPorps {
  id: string;
  label: string;
  onClick: () => void;
  checked: string;
  borderColor: string;
  bgColor: string;
}

const RadioInput = ({
  id,
  label,
  onClick,
  checked,
  bgColor,
  borderColor,
}: RadioInputPorps) => {
  return (
    <div onClick={onClick} className="flex flex-row gap-2 ">
      <div
        className={`h-6 w-6 border  rounded-full flex justify-center items-center ${
          checked === label ? borderColor : 'border-zinc-400'
        }`}
      >
        <input
          id={id}
          className={`caret-transparent outline-none h-3.5 w-3.5 border  rounded-full ${
            checked === label ? bgColor : null
          } ${checked === label ? borderColor : 'border-zinc-400'}`}
        />
      </div>
      <label className="text-center font-normal text-base text-neutral-500">
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
