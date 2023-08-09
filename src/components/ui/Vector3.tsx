export default function Vector3(props: Vector3Props) {
  return (
    <div className={`flex ${props.className}`}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 5 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0.191 0.176 C 0.069 0.289 4.575e-07 0.442 4.506e-07 0.601 C 4.436e-07 0.761 0.069 0.914 0.191 1.027 L 3.424 4.004 L 0.191 6.981 C 0.072 7.094 0.006 7.246 0.008 7.404 C 0.009 7.561 0.078 7.712 0.199 7.824 C 0.32 7.935 0.484 7.999 0.655 8 C 0.826 8.001 0.991 7.941 1.115 7.831 L 4.809 4.429 C 4.931 4.316 5 4.163 5 4.004 C 5 3.844 4.931 3.691 4.809 3.578 L 1.115 0.176 C 0.992 0.063 0.826 -1.824e-07 0.653 -1.9e-07 C 0.48 -1.976e-07 0.314 0.063 0.191 0.176 Z"
          fill="black"
         />
      </svg>
    </div>
  );
}

Vector3.defaultProps = {
  className: "",
};

interface Vector3Props {
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
