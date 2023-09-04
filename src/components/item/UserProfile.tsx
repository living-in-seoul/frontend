import Image, { StaticImageData } from 'next/image';
import { profile } from '../../../public';
import { getTimeAgo } from '@/utils/utilFunc';

interface DetailMainProps {
  nickname: string;
  createdAt: string;
  userImg?: string | StaticImageData | null;
  postViewCount?: number;
  onMap?: boolean;
  ondetail?: boolean;
}

const UserProfile = ({
  nickname,
  createdAt,
  userImg = profile,
  postViewCount,
  onMap = false,
  ondetail = false,
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
              priority={false}
            />
          </div>
        )}
        <div
          className={`flex ${
            onMap ? ' px-0' : 'flex-col  gap-1 justify-center px-[10px]'
          }`}
        >
          <div className="flex items-center gap-2 mb-0.5 ">
            {/* 닉네임 */}
            <h3
              className={`text-sm truncate ${
                onMap ? 'text-neutral-500 max-w-full' : 'text-gray1 leading-3 '
              } max-w-[80px] `}
            >
              {onMap ? `${nickname}님이 등록 ·` : nickname}
            </h3>
            {/* 레벨 */}
            {!onMap && (
              <p className="text-gray4 text-sm font-medium leading-3 ">Lv.1</p>
            )}
          </div>
          <div
            className={`text-gray4 text-sm font-normal ${
              !onMap && 'leading-3'
            } `}
          >
            {getTimeAgo(createdAt)} {`· 조회수 ${postViewCount ?? 0}`}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
