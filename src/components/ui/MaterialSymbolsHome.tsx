export default function MaterialSymbolsHome(props: MaterialSymbolsHomeProps) {
  return (
    <div className={`${props.className}`}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 5.667 29.75 V 12.75 L 17 4.25 L 28.333 12.75 V 29.75 H 19.833 V 19.833 H 14.167 V 29.75 H 5.667 Z"
          fill="black"
         />
      </svg>
    </div>
  );
}

MaterialSymbolsHome.defaultProps = {
  className: "",
};

interface MaterialSymbolsHomeProps {
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
