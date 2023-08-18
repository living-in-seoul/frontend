interface Props {
  title: string;
  select?: boolean;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
  size?: 'large' | 'small' | 'default';
}

const getButtonSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return { div: 'py-[1px] px-[8px]', span: 'text-[10px] text-zinc-600' };
    case 'large':
      return { div: '', span: '' };
    case 'default':
      return { div: 'py-1/2 px-3.5 ', span: 'text-xs  leading-7' };
    default:
      return { div: 'py-1/2 px-3.5', span: 'text-xs' };
  }
};

const Select = ({
  disable = false,
  className,
  title,
  select = false,
  size = 'default',
  onClick,
}: Props) => {
  return (
    <div
      onClick={disable ? undefined : onClick}
      className={`${className} ${
        getButtonSizeStyles(size).div
      } transition-all rounded-3xl border font-normal justify-center items-center gap-2.5 inline-flex ${
        select ? 'bg-neutral-700' : 'border-zinc-400 hover:bg-neutral-200/70'
      }`}
    >
      <span
        className={`${getButtonSizeStyles(size).span} ${
          select ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </span>
    </div>
  );
};
<div className="text-zinc-600 text-xs font-normal ">#맛집</div>;
export default Select;
