interface Props {
  path: {
    path: string;
    width: number;
    height: number;
  };
  fill?: string;
}

const Icons = ({ path, fill }: Props) => {
  return (
    <svg
      width={path.width}
      height={path.height}
      viewBox={`0 0 ${path.width} ${path.height}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={path.path} className="w-full h-full" fill={fill} />
    </svg>
  );
};

export default Icons;
