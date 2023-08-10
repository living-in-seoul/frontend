interface Props {
  title: string;
  select?: boolean;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
}

const getButtonSizeStyles = (color: string) => {
  switch (color) {
    case '':
      return { bgColor: '', color: '' };
  }
};

const Button = ({
  disable = false,
  className,
  title,
  select = false,
  onClick,
}: Props) => {
  return (
    <div
      onClick={disable ? undefined : onClick}
      className={`${className} py-1/2 px-3.5 transition-all  rounded-3xl border font-normal justify-center items-center gap-2.5 inline-flex ${
        select ? 'bg-neutral-700' : 'border-zinc-400 hover:bg-neutral-200/70'
      }`}
    >
      <span
        className={`text-xs leading-loose ${
          select ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </span>
    </div>
  );
};

export default Button;
