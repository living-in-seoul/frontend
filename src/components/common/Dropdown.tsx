interface DropdownProps {
  className: string;
  value: string;
  options: string[];
  openSelect: boolean;
  onToggleHandler: () => void;
  onClickHandler: (data: number) => void;
}

const Dropdown = ({
  className,
  value,
  options,
  openSelect,
  onToggleHandler,
  onClickHandler,
}: DropdownProps) => {
  return (
    <div className={`${className} ${openSelect ? '' : ''}`}>
      <li className="selected" onClick={onToggleHandler}>
        {value}
      </li>
      <div className="optionBox">
        {openSelect &&
          options.map((option, idx) => (
            <li
              className="unselected"
              key={idx}
              onClick={() => onClickHandler(idx)}
            >
              {option}
            </li>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
