export default function MdiHeart4(props: MdiHeart4Props) {
  return (
    <div className={`${props.className}`}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 14 24.908 L 12.308 23.368 C 6.3 17.92 2.333 14.315 2.333 9.917 C 2.333 6.312 5.157 3.5 8.75 3.5 C 10.78 3.5 12.728 4.445 14 5.927 C 15.272 4.445 17.22 3.5 19.25 3.5 C 22.843 3.5 25.667 6.312 25.667 9.917 C 25.667 14.315 21.7 17.92 15.692 23.368 L 14 24.908 Z"
          fill="#636363"
        />
      </svg>
    </div>
  );
}

MdiHeart4.defaultProps = {
  className: '',
};

interface MdiHeart4Props {
  className: string;
}
