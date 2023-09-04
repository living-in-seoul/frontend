const DisplayRecents = () => {
  return (
    <div>
      {['영등포구', '서초구'].map((gu) => {
        return (
          <div
            className="flex justify-center items-center border border-neutral-300 py-1 px-2 rounded-lg gap-1 cursor-pointer"
            key={gu}
          >
            <div className="text-sm ">{gu}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayRecents;
