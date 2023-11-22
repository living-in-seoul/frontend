const UserProfileSkeleton = ({ onMap = false }) => {
  return (
    <div className="flex w-full rounded-xl h-full">
      {/* 유저 */}
      {!onMap && (
        <div className="skeleton relative shrink-0 w-[36px] h-[36px] rounded-full overflow-hidden"></div>
      )}

      <div
        className={`flex ${
          onMap ? 'px-0' : 'flex-col gap-1 justify-center px-[10px]'
        } h-full w-full`}
      >
        <div className="flex items-center gap-2 min-w-[200px]">
          {/* 닉네임 */}
          <div
            className={`truncate  ${
              onMap
                ? ' text-neutral-500 max-w-[60px]'
                : 'font-semibold text-black'
            } leading-3 max-w-[80px] h-3 w-28 skeleton rounded-lg`}
          >
            {/* {onMap ? `${nickname}님이 등록 ·` : nickname} */}
          </div>
          {/* 레벨 */}
          {!onMap && (
            <div className="text-neutral-600 text-xs font-medium leading-3">
              {/* Lv.1 */}
            </div>
          )}
        </div>
        <div className="bg-gray-200 skeleton font-normal leading-3 h-3 w-28 rounded-xl">
          {/* {getTimeAgo(createdAt)} {`· 조회수 ${postViewCount}`} */}
        </div>
      </div>
    </div>
  );
};
export default UserProfileSkeleton;
