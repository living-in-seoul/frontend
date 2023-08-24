import { SVGProps } from 'react';

export interface IconProps {
  path: {
    path: string;
    width: number;
    height: number;
    pathFill?: string;
  };
  fill?: string;
  stroke?: string;
  onClick?: () => void;
  option?: Partial<SVGProps<SVGPathElement>>;
  className?: string;
}
const Icons = ({ path, fill, onClick, option, className }: IconProps) => {
  return (
    <svg
      width={path.width}
      height={path.height}
      viewBox={`0 0 ${path.width} ${path.height}`}
      onClick={onClick}
      fill={fill}
      className={className}
    >
      <path d={path.path} fill={path.pathFill} {...option} />
    </svg>
  );
};

export default Icons;
