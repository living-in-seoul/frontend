import EditProfileHeader from '@/components/profile/editpage/EditProfileHeader';
import EditProfileImage from '@/components/profile/editpage/EditProfileImage';
import EditProfileInfo from '@/components/profile/editpage/EditProfileInfo';
import { verifyAndRefreshToken } from '@/service/token';
import { getProfile } from '@/service/user';
import { cookies } from 'next/headers';

const EditProfilePage = async () => {
  const token = cookies().get('accessToken')?.value;
  if (!token) {
    await verifyAndRefreshToken();
  }

  const userProfile = await getProfile();
  return (
    <section className="flex flex-col relative w-full h-full gap-6">
      <EditProfileHeader />

      {userProfile && (
        <>
          <EditProfileImage profileImageUrl={userProfile?.profileImageUrl} />
          <EditProfileInfo profile={userProfile} />
        </>
      )}
    </section>
  );
};
export default EditProfilePage;

// 밑에 어떻게 보이게 할까? div tag 쓰니깐 se에서는 안되는데
