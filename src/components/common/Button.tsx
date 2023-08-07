interface Props {
  size: "small" | "medium";
  bgColor?: string;
  color?: string;
  title: string;
}

const getButtonSizeStyles = (size: string) => {
  switch (size) {
    case "small":
      return "w-[103px] h-[41px]";
    case "medium":
      return `w-[245px] h-[41px]`;
  }
};

const Button = ({ size, title }: Props) => {
  return (
    <div>
      <button
        className={`rounded-[0.625rem] text-base border border-neutral-800 ${getButtonSizeStyles(
          size,
        )}`}>
        {title}
      </button>
    </div>
  );
};

export default Button;
