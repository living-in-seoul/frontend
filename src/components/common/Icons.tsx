interface Props {
  path: {
    path: string;
    width: number;
    height: number;
  };
  fill?: string;
  stroke?: string;
  onClick?: () => void;
}

const Icons = ({ path, fill, stroke, onClick }: Props) => {
  return (
    <svg
      width={path.width}
      height={path.height}
      viewBox={`0 0 ${path.width} ${path.height}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      onClick={onClick}
    >
      <path
        d={path.path}
        className="w-full h-full"
        fill={fill}
        stroke={stroke}
      />
    </svg>
  );
};

export default Icons;
