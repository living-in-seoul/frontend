interface Props {
  title: string;
  select?: boolean;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
  size?: 'large' | 'medium' | 'small' | 'full' | 'default' | 'alert';
  selectTag?: boolean;
  Icon?: JSX.Element;
}

const getButtonSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return {
        div: 'py-1 px-[10px] border border-zinc-400',
        span: 'text-neutral-600 text-xs font-medium leading-3',
      };
    case 'medium':
      return { div: 'py-[5px] px-2.5', span: 'text-[10px]' };
    case 'large':
      return {
        div: 'px-3.5 py-2',
        span: 'text-black text-xs font-normal leading-3',
      };
    case 'full':
      return { div: 'w-full h-full px-2.5', span: 'text-[0.75rem]' };
    case 'default':
      return {
        div: 'min-w-[80px] py-0.5 px-5 ',
        span: 'text-xs font-normal leading-7',
      };
    case 'alert':
      return {
        div: 'py-1 px-3 ',
        span: 'text-center text-white text-xs font-semibold',
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
  selectTag = false,
  Icon,
}: Props) => {
  return (
    <div
      onClick={disable ? undefined : onClick}
      className={`${className} ${
        getButtonSizeStyles(size).div
      } transition-all rounded-3xl border font-normal justify-center items-center gap-2.5 inline-flex ${
        select ? 'bg-neutral-400' : 'border-zinc-400'
      }
      ${selectTag ? 'bg-neutral-700' : 'white'}`}
    >
      <span
        className={`${getButtonSizeStyles(size).span} ${
          select ? 'text-black' : 'text-neutral-500'
        } ${selectTag ? 'text-white' : 'text-black'}`}
      >
        {title}
      </span>
      {Icon && Icon}
    </div>
  );
};
export default Select;
