// interface Props {
//   path: string;
//   size: 'small' | 'medium' | 'large' | 'xlarge';
//   color?: string;
// }

// const getIconSizeStyles = (size: string) => {
//   // return { divSize: `w-[${size}px] h-[${size}px]`, svgSize: size };

//   switch (size) {
//     case 'small':
//       return { divSize: 'w-[16px] h-[16px]', svgSize: 16 };
//     case 'medium':
//       return { divSize: 'w-[32px] h-[32px]', svgSize: 32 };
//     case 'large':
//       return { divSize: 'w-[64px] h-[64px]', svgSize: 64 };
//     case 'xlarge':
//       return { divSize: 'w-[128px] h-[128px]', svgSize: 128 };
//     default:
//       return { divSize: 'w-[16px] h-[16px]', svgSize: 16 };
//   }
// };

// const Icons = ({ path, size, color = 'black' }: Props) => {
//   return (
//     <div className={getIconSizeStyles(size).divSize}>
//       <svg
//         width={getIconSizeStyles(size).svgSize}
//         height={getIconSizeStyles(size).svgSize}
//         viewBox={`0 0 ${getIconSizeStyles(size).svgSize / 2} ${
//           getIconSizeStyles(size).svgSize
//         }`}
//         aria-hidden="true"
//         preserveAspectRatio="xMidYMid meet"
//       >
//         <path d={path} color={color} className="w-full h-full" />
//       </svg>
//     </div>
//   );
// };

// export default Icons;

interface IconProps extends PathStyleProps {
  path: string;
  isHover?: boolean;
}
interface PathStyleProps {
  width: number;
  height: number;
  color: string;
}

const Icons = ({ size, path }: { size: number; path: string }) => {
  return (
    <>
      <div>
        <svg
          fill="red"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            transform={`translate(${size / 6}, ${size / 6})`}
            d={path}
          ></path>
        </svg>
      </div>
    </>
  );
};

export default Icons;
