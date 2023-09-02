const IndicatorSkeleton = () => {
  return (
    <div className="flex w-full p-5 pt-[30px] justify-center">
      <div className="relative skeleton bg-gray-200 flex w-[100px] rounded-3xl overflow-hidden">
        <div // 검은색 dot
          className={`w-[25px] h-[7px]`}
        />
      </div>
    </div>
  );
};
export default IndicatorSkeleton;
