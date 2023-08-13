interface Props {
  size: 'small' | 'medium' | 'large';
  bgColor?: string;
  hoverColor?: string;
  color?: string;
  title: string;
  border?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const getButtonSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return 'w-[103px] h-[41px]';
    case 'medium':
      return `w-[245px] h-[41px]`;
    case 'large':
      return `w-full h-14`;
  }
};

const Button = ({
  size,
  title,
  color,
  bgColor,
  hoverColor = 'bg-teal-400',
  type,
  border = 'border border-neutral-800',
}: Props) => {
  return (
    <div>
      <button
        className={`active:${hoverColor} hover:${hoverColor} rounded-xl font-semibold text-base ${color} ${bgColor} ${border}  ${getButtonSizeStyles(
          size,
        )}`}
        type={type}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
