export default function Vector(props: VectorProps) {
  return (
    <div className={`${props.className}`}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 19 19 L 14.657 14.657 M 14.657 14.657 C 15.4 13.914 15.989 13.032 16.391 12.062 C 16.793 11.091 17 10.051 17 9 C 17 7.95 16.793 6.909 16.391 5.939 C 15.989 4.968 15.4 4.086 14.657 3.343 C 13.914 2.6 13.032 2.011 12.062 1.609 C 11.091 1.207 10.051 1 9 1 C 7.95 1 6.909 1.207 5.939 1.609 C 4.968 2.011 4.086 2.6 3.343 3.343 C 1.843 4.843 1 6.878 1 9 C 1 11.122 1.843 13.157 3.343 14.657 C 4.843 16.157 6.878 17 9 17 C 11.122 17 13.157 16.157 14.657 14.657 Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
         />
      </svg>
    </div>
  );
}

Vector.defaultProps = {
  className: "",
};

interface VectorProps {
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
