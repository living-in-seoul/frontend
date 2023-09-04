import { getProfile } from '@/service/user';
import Image from 'next/image';
import { profile } from '../../../public';

const ProfileComponent = async () => {
  const user: ResponseUserProfileData = await getProfile();

  const userImage =
    user && user.profileImageUrl ? user.profileImageUrl : profile;
  const useHowday: HowdayType =
    user && user.movedDate ? (user.movedDate as HowdayType) : 'null';

  const HowDayment = (useHowday: HowdayType) => {
    switch (useHowday) {
      case '~6개월':
        return '서울에서의 새로운 경험을 즐기세요!';
      case '1~2년':
        return '서울생활 적응을 잘하고 있어요!';
      case '3~4년':
        return '서울러 못지 않은 서울러네요!';
      case '5년 이상':
        return '99.9% 누가 봐도 완벽 서울러네요!';
      default:
        return '서울에서의 새로운 경험을 즐기세요!';
    }
  };

  if (user) {
    return (
      <div className="flex w-full h-28 bg-white rounded-2xl shadow py-3">
        <div className="flex w-full justify-center">
          <Image
            src={userImage}
            alt={`${user.nickname}의 이미지`}
            width={88}
            height={88}
          />
          <div className="flex flex-col w-56 justify-center pl-4">
            <span className="text-emerald-500 text-xl font-bold leading-relaxed">
              {user.nickname}
              <span className="text-black text-xl font-bold leading-relaxed">
                님
              </span>
              <br />
            </span>

            <span className="text-neutral-700 text-base font-medium leading-relaxed">
              {`${HowDayment(useHowday)}`}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-28 bg-white rounded-2xl shadow py-3">
      <div className="flex w-full justify-center">
        <Image src={profile} alt="user" width={88} height={88} />
        <div className="flex flex-col w-56 justify-center pl-4">
          <span className="text-emerald-500 text-xl font-bold leading-relaxed">
            반가워요!
            <br />
          </span>
          <span className="text-neutral-700 text-base font-medium leading-relaxed">
            서울바이벌과 함께 성장해 봐요!
          </span>
        </div>
      </div>
    </div>
    // <div>
    //   <span className="text-black text-xl font-semibold leading-[34px]">
    //     {user ? user.nickname + '님' : ' '}
    //     <br />
    //   </span>

    //   <span className="text-black text-xl font-normal leading-[34px]">
    //     오늘도 저와 함께
    //     <br />
    //     즐거운 서울생활 시작해 봐요!
    //   </span>
    // </div>
  );
};
export default ProfileComponent;
