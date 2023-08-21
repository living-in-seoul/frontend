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
      onClick={onClick}
      fill={fill}
    >
      <path d={path.path} {...option} />
    </svg>
  );
};

export default Icons;
