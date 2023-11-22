import Select from '../common/Select';
import UserProfileSkeleton from '../item/UserProfileSkeleton';
export const PostItemSkeletonUser = () => (
  <div className="flex w-7 bg-gray-200 skeleton h-3 rounded-xl animate-pulse">
    {/* 유저 */}
    <div className="skeleton relative shrink-0 w-[36px] h-[36px] rounded-full overflow-hidden"></div>

    <div className={`flex ${'flex-col  gap-1 justify-center px-[10px]'}`}>
      <div className="bg-gray-200 skeleton flex items-center gap-2 min-w-[200px] animate-pulse">
        {/* 닉네임 */}
        <p
          className={`text-xs truncate font-semibold text-black leading-3 max-w-[80px]`}
        ></p>
        {/* 레벨 */}
        <p className="text-neutral-600 text-xs font-medium leading-3 animate-pulse">
          {/* Lv.1 */}
        </p>
      </div>
      <div className="bg-gray-200 skeleton text-neutral-500 text-xs font-normal leading-3 animate-pulse">
        {/* {getTimeAgo(createdAt)} {`· 조회수 ${postViewCount}`} */}
      </div>
    </div>
  </div>
);

const PostItemSkeleton = () => {
  return (
    <article className="flex flex-col last:border-[0] px-4 pt-[25px]">
      <UserProfileSkeleton />
      {/* 컨텐츠 */}
      <div className="w-full flex justify-between min-h-[64px]">
        <div className="flex basis-2/3 pt-4  whitespace-pre-wrap">
          <span className="rounded-xl skeleton bg-gray-200 w-full text-black text-xs font-normal leading-[18px]"></span>
        </div>

        <div className="skeleton bg-gray-200 relative w-16 h-16 rounded-xl shadow overflow-hidden"></div>
      </div>
      {/* 태그 후기 좋아요 */}
      <div className="flex justify-between py-4 items-center">
        <div className="flex gap-2 items-center">
          <Select
            disable
            title={''}
            className="h-[22px] w-[70px] rounded-md skeleton bg-gray-200 border-none"
            size="small"
          />
          <div className="flex justify-center items-center h-[16px] w-[100px] rounded-md skeleton bg-gray-200"></div>
        </div>
        <div className="flex gap-2 w-14 rounded-lg h-3 skeleton bg-gray-200 "></div>
      </div>
    </article>
  );
};
export default PostItemSkeleton;
