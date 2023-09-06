const AlartElement = ({
  title,
  toggleState,
  setToggleState,
}: {
  title: '푸시 알림 받기' | '댓글 알림' | '좋아요 알림' | '해시태그 알림';
  toggleState: boolean;
  setToggleState: (newValue: boolean) => void;
}) => {
  return (
    <div
      className={`flex justify-between py-5 px-4 ${
        title === '푸시 알림 받기'
          ? 'border-b-[5px]'
          : 'border-b-[0.5px] last:border-none'
      } border-zinc-400 items-center`}
    >
      <div className="w-40 text-black text-sm font-normal leading-none">
        {title}
      </div>
      <button
        className="w-12 h-6 relative"
        onClick={() => setToggleState(!toggleState)}
      >
        <div
          className={`relative flex items-center w-12 transition-all h-6 left-0 ${
            toggleState ? 'bg-neutral-700' : 'bg-zinc-300'
          } rounded-3xl`}
        >
          <div
            style={{ left: toggleState ? '0.25rem' : '1.5rem' }}
            className={`absolute ${
              toggleState ? 'left-1' : 'left-6'
            } w-5 h-4 bg-white rounded-3xl transition-all`}
          />
        </div>
      </button>
    </div>
  );
};

export default AlartElement;
