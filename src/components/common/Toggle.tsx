interface ToggleProps {
  options: {
    key: MapToggle;
    name: string;
  }[];
  active: string;
  toggleHandler: (data: MapToggle) => void;
}

const Toggle = ({ options, active, toggleHandler }: ToggleProps) => {
  const activeIndex = options.findIndex((option) => option.key === active);
  const toggleWidth = 100 / options.length;

  return (
    <div className="relative flex justify-between items-center px-2 w-[170px] h-8 bg-neutral-500 rounded-2xl text-[0.72rem] hover:cursor-pointer">
      <div
        className="absolute top-0 left-0 h-[78%] w-full mx-2 my-1 flex justify-center items-center bg-white transition-transform duration-500 ease-in-out rounded-2xl"
        style={{
          width: `${toggleWidth - 4}%`,
          transform: `translateX(${toggleWidth * activeIndex * 2}%)`,
        }}
      ></div>
      {options.map((option, _) => {
        const isActive = option.key === active;
        return (
          <div
            key={option.key}
            className={`flex items-center justify-center w-full  rounded-xl z-10 relative ${
              !isActive && 'text-white'
            }`}
            onClick={() => toggleHandler(option.key)}
          >
            {option.name + ' 맵'}
          </div>
        );
      })}
    </div>
  );
};

export default Toggle;
