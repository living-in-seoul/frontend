import { SVGProps } from 'react';

interface PathProp {
  path: string;
  width: number;
  height: number;
  pathFill?: string;
}
export interface IconProps {
  path: PathProp | PathProp[];
  fill?: string;
  stroke?: string;
  onClick?: () => void;
  option?: Partial<SVGProps<SVGPathElement>>;
  className?: string;
  children?: JSX.Element;
}
const Icons = ({
  path,
  fill,
  onClick,
  option,
  className,
  children,
}: IconProps) => {
  const renderPath = (pathData: PathProp | PathProp[]) => {
    if (Array.isArray(pathData)) {
      return pathData.map((p, index) => (
        <path key={index} d={p.path} fill={p.pathFill} {...option} />
      ));
    } else {
      return <path d={pathData.path} fill={pathData.pathFill} {...option} />;
    }
  };
  const width = Array.isArray(path) ? path[0].width : path.width;
  const height = Array.isArray(path) ? path[0].height : path.height;

  return (
    <>
      {children ? (
        children
      ) : (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          onClick={onClick}
          fill={fill}
          className={className}
        >
          {renderPath(path)}
        </svg>
      )}
    </>
  );
};

export default Icons;
