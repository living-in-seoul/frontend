import Select from '../common/Select';
import UserProfileSkeleton from '../item/UserProfileSkeleton';

const PostItemSkeleton = () => {
  return (
    <article className="flex flex-col last:border-[0] px-4 pt-[25px]">
      <UserProfileSkeleton onMap={true} />
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
            className="h-[25px] w-[35px] rounded-md skeleton bg-gray-200 border-none"
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
