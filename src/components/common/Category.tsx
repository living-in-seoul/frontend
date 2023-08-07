interface Props {
  title: string;
}

const getButtonSizeStyles = (color: string) => {
  switch (color) {
    case "":
      return { bgColor: "", color: "" };
  }
};

const Button = ({ title }: Props) => {
  return (
    <div className="rounded-[0.625rem] border border-neutral-600">
      <span className="px-[0.9375rem]">{title}</span>
    </div>
  );
};

export default Button;
