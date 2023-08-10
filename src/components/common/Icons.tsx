interface IconProps {
  path: string;
  size: number;
  color?: string;
}

const getIconSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return { divSize: 'w-[16px] h-[16px]', svgSize: 16 };
    case 'medium':
      return { divSize: 'w-[32px] h-[32px]', svgSize: 32 };
    case 'large':
      return { divSize: 'w-[64px] h-[64px]', svgSize: 64 };
    case 'xlarge':
      return { divSize: 'w-[128px] h-[128px]', svgSize: 128 };
    default:
      return { divSize: 'w-[16px] h-[16px]', svgSize: 16 };
  }
};

const Icons = ({ path, size, color = 'black' }: IconProps) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
      >
        <path d={path} fill="black" />
      </svg>
    </div>
  );
};

export default Icons;
