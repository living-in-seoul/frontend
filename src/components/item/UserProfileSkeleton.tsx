const UserProfileSkeleton = ({ onMap = false }) => {
  return (
    <div className="flex w-7 bg-gray-200 skeleton h-3 rounded-xl">
      {/* 유저 */}
      {!onMap && (
        <div className="skeleton relative shrink-0 w-[36px] h-[36px] rounded-full overflow-hidden"></div>
      )}

      <div
        className={`flex ${
          onMap ? ' px-0' : 'flex-col  gap-1 justify-center px-[10px]'
        }`}
      >
        <div className="bg-gray-200 skeleton flex items-center gap-2 min-w-[200px]">
          {/* 닉네임 */}
          <p
            className={`text-xs truncate  ${
              onMap
                ? ' text-neutral-500 max-w-[180px]'
                : 'font-semibold text-black'
            } leading-3 max-w-[80px] `}
          >
            {/* {onMap ? `${nickname}님이 등록 ·` : nickname} */}
          </p>
          {/* 레벨 */}
          {!onMap && (
            <p className="text-neutral-600 text-xs font-medium leading-3">
              Lv.1
            </p>
          )}
        </div>
        <div className="bg-gray-200 skeleton text-neutral-500 text-xs font-normal leading-3">
          {/* {getTimeAgo(createdAt)} {`· 조회수 ${postViewCount}`} */}
        </div>
      </div>
    </div>
  );
};
export default UserProfileSkeleton;
