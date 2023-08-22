interface Props {
  title: string;
  select?: boolean;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
  size?: 'large' | 'medium' | 'small' | 'default';
}

const getButtonSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return { div: 'py-1 px-[8px]', span: 'text-[10px] text-zinc-600' };
    case 'medium':
      return { div: 'py-[5px] w-[75px]', span: 'text-[10px] text-zinc-600' };
    case 'large':
      return { div: '', span: '' };
    case 'default':
      return {
        div: 'min-w-[80px] py-0.5 px-5 ',
        span: 'text-xs font-normal leading-7',
      };
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
        select ? 'bg-neutral-400' : 'border-zinc-400'
      }`}
    >
      <span
        className={`${getButtonSizeStyles(size).span} ${
          select ? 'text-black' : 'text-neutral-500'
        }`}
      >
        {title}
      </span>
    </div>
  );
};
export default Select;
