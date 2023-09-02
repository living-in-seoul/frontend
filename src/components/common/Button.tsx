import { MouseEventHandler } from 'react';

interface Props {
  title: string | JSX.Element;
  size:
    | 'small'
    | 'medium'
    | 'large'
    | 'medium-large'
    | 'full'
    | 'w-full'
    | 'default';
  bgColor?: string;
  hoverColor?: string;
  color?: string;
  border?: string;
  select?: boolean;
  disable?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isRounded?: boolean;
  disabled?: boolean;
}

const getButtonSizeStyles = (size: string) => {
  switch (size) {
    case 'full':
      return {
        button: 'w-full h-full',
        span: 'w-full h-full',
      };
    case 'w-full':
      return {
        button: 'w-full h-[51px]',
        span: 'w-full h-full',
      };
    case 'small':
      return {
        button: 'w-[103px] h-[41px]',
        span: 'text-[11px] text-zinc-600',
      };
    case 'medium':
      return { button: `w-full py-1`, span: 'text-xs' };
    case 'medium-large':
      return { button: `w-[132px] py-1`, span: 'text-xs' };
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
  isRounded = true,
  disabled,
}: Props) => {
  return (
    <button
      onClick={disable ? undefined : onClick}
      className={`active:${hoverColor} hover:${hoverColor} transition-all ${
        isRounded ? 'rounded-lg' : null
      } text-base ${color} ${bgColor} ${border} ${className} ${
        getButtonSizeStyles(size).button
      } ${select ? hoverColor : 'border-l-zinc-400 hover:bg-neutral-200/70'} `}
      type={type}
      disabled={disabled}
    >
      <span
        className={` ${getButtonSizeStyles(size).span} ${
          select ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </span>
    </button>
  );
};

export default Button;
