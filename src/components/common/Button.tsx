interface Props {
  title: string;
  size: 'small' | 'medium' | 'large' | 'default';
  bgColor?: string;
  hoverColor?: string;
  color?: string;
  border?: string;
  select?: boolean;
  disable?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  onClick?: () => void;
}

const getButtonSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return {
        button: 'w-[103px] h-[41px]',
        span: 'text-[11px] text-zinc-600',
      };
    case 'medium':
      return { button: `w-full py-1`, span: 'text-xs' };
    case 'large':
      return { button: `w-[275px] h-[51px]`, span: 'text-md  leading-7' };
    default:
      return {
        button: 'w-full h-full',
        span: 'text-[11px] text-zinc-500',
      };
  }
};

const Button = ({
  size = 'default',
  title,
  color,
  bgColor,
  hoverColor = 'bg-teal-400',
  type,
  select = false,
  className,
  disable = false,
  onClick,
  border,
}: Props) => {
  return (
    <div>
      <button
        onClick={disable ? undefined : onClick}
        className={`active:${hoverColor} hover:${hoverColor} transition-all rounded-lg text-base ${color} ${bgColor} ${border} ${className} ${
          getButtonSizeStyles(size).button
        } ${
          select
            ? 'bg-neutral-500'
            : 'border-l-zinc-400 hover:bg-neutral-200/70'
        } `}
        type={type}
      >
        <span
          className={` ${getButtonSizeStyles(size).span} ${
            select ? 'text-white' : 'text-black'
          }`}
        >
          {title}
        </span>
      </button>
    </div>
  );
};

export default Button;
