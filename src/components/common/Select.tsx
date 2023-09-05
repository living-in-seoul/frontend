interface Props {
  title: string;
  select?: boolean;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
  size?: 'large' | 'medium' | 'small' | 'full' | 'default' | 'alert';
  selectTag?: boolean;
  Icon?: JSX.Element | null;
}

const getButtonSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return {
        div: 'py-1 px-[10px] border border-zinc-400',
        span: 'text-xs font-medium leading-3',
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
      } transition-all rounded-3xl  font-normal justify-center items-center gap-2.5 inline-flex cursor-pointer ${
        select
          ? 'bg-lightestMint border-2 border-primary'
          : 'border-[1.125px] border-gray5'
      }
      ${selectTag ? 'bg-lightestMint border-primary ' : 'white'}`}
    >
      <span
        className={`${getButtonSizeStyles(size).span} text-[14px] ${
          select ? 'text-primary ' : ' border-gray4'
        } ${selectTag ? 'text-primary ' : 'text-gray4'}`}
      >
        {title}
      </span>
      {Icon && Icon}
    </div>
  );
};
export default Select;
