export default function MdiHeart(props: MdiHeartProps) {
  return (
    <div className={`${props.className}`}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 6 10.675 L 5.275 10.015 C 2.7 7.68 1 6.135 1 4.25 C 1 2.705 2.21 1.5 3.75 1.5 C 4.62 1.5 5.455 1.905 6 2.54 C 6.545 1.905 7.38 1.5 8.25 1.5 C 9.79 1.5 11 2.705 11 4.25 C 11 6.135 9.3 7.68 6.725 10.015 L 6 10.675 Z"
          fill="#787878"
         />
      </svg>
    </div>
  );
}

MdiHeart.defaultProps = {
  className: "",
};

interface MdiHeartProps {
  className: string;
}

/**
 * This component was generated from Figma with FireJet.
 * Learn more at https://www.firejet.io
 *
 * README:
 * The output code may look slightly different when copied to your codebase. To fix this:
 * 1. Include the necessary fonts. The required fonts are imported from public/index.html
 * 2. Include the global styles. They can be found in App.css
 *
 * Note: Step 2 is not required for tailwind.css output
 */
