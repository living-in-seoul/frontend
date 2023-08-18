import { SVGProps } from 'react';

export interface IconProps {
  path: {
    path: string;
    width: number;
    height: number;
  };
  fill?: string;
  stroke?: string;
  onClick?: () => void;
  option?: Partial<SVGProps<SVGPathElement>>;
}

const Icons = ({ path, fill, onClick, option }: IconProps) => {
  return (
    <svg
      width={path.width}
      height={path.height}
      viewBox={`0 0 ${path.width} ${path.height}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      onClick={onClick}
    >
      <path d={path.path} className="w-full h-full" fill={fill} {...option} />
    </svg>
  );
};

export default Icons;
