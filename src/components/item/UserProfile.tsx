import Image from 'next/image';
import { profile } from '../../../public';
import { getTimeAgo } from '@/utils/utilFunc';

interface DetailMainProps {
  nickname: string;
  createdAt: string;
  postViewCount?: number;
  onMap?: boolean;
}

const UserProfile = ({
  nickname,
  createdAt,
  postViewCount,
  onMap = false,
}: DetailMainProps) => {
  return (
    <>
      <div className="flex w-full">
        {/* 유저 */}
        {!onMap && (
          <div className="relative shrink-0 w-[36px] h-[36px] rounded-full overflow-hidden">
            <Image
              src={profile}
              alt={`user`}
              fill
              className="absolute top-0"
              sizes={'36px'}
            />
          </div>
        )}

        <div
          className={`flex ${
            onMap ? ' px-0' : 'flex-col  gap-1 justify-center px-[10px]'
          }`}
        >
          <div className="flex items-center gap-2">
            {/* 닉네임 */}
            <h3
              className={`text-xs truncate  ${
                onMap
                  ? 'text-neutral-500 max-w-full'
                  : 'font-semibold text-black'
              } leading-3 max-w-[80px] `}
            >
              {onMap ? `${nickname}님이 등록 ·` : nickname}
            </h3>
            {/* 레벨 */}
            {!onMap && (
              <p className="text-neutral-600 text-xs font-medium leading-3">
                Lv.1
              </p>
            )}
          </div>
          <div className="text-neutral-500 text-xs font-normal leading-3">
            {getTimeAgo(createdAt)} {`· 조회수 ${postViewCount}`}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
