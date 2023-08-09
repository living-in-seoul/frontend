export default function ClarityAvatarSolid(props: ClarityAvatarSolidProps) {
  return (
    <div className={`${props.className}`}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_9_53)">
          <path
            d="M 22.958 18.39 C 21.752 17.084 20.29 16.042 18.662 15.33 C 17.035 14.617 15.277 14.249 13.5 14.249 C 11.723 14.249 9.965 14.617 8.338 15.33 C 6.71 16.042 5.248 17.084 4.043 18.39 C 3.856 18.596 3.752 18.863 3.75 19.14 V 23.64 C 3.754 23.936 3.874 24.218 4.085 24.426 C 4.295 24.634 4.579 24.75 4.875 24.75 H 22.125 C 22.423 24.75 22.71 24.632 22.921 24.421 C 23.132 24.21 23.25 23.923 23.25 23.625 V 19.125 C 23.244 18.853 23.14 18.592 22.958 18.39 Z"
            fill="#636363"
           />
          <path
            d="M 13.5 12.75 C 16.4 12.75 18.75 10.4 18.75 7.5 C 18.75 4.601 16.4 2.25 13.5 2.25 C 10.601 2.25 8.25 4.601 8.25 7.5 C 8.25 10.4 10.601 12.75 13.5 12.75 Z"
            fill="#636363"
           />
        </g>
        <defs>
          <clipPath id="clip0_9_53">
            <rect width="27" height="27" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

ClarityAvatarSolid.defaultProps = {
  className: "",
};

interface ClarityAvatarSolidProps {
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
