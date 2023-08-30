import EditProfileHeader from '@/components/profile/editpage/EditProfileHeader';
import EditProfileImage from '@/components/profile/editpage/EditProfileImage';
import EditProfileInfo from '@/components/profile/editpage/EditProfileInfo';
import { getRefreshToken } from '@/service/token';
import { getProfile } from '@/service/user';
import { cookies } from 'next/headers';

const EditProfilePage = async () => {
  const userProfile = await getProfile();
  const { profileImageUrl } = userProfile;
  return (
    <section className="flex flex-col relative w-full h-full gap-6">
      <EditProfileHeader />
      <EditProfileImage />
      <EditProfileInfo profile={userProfile} />
      <div id="portalSignin" />
      <div id="portalSignin2" />
    </section>
  );
};
export default EditProfilePage;

// 밑에 어떻게 보이게 할까? div tag 쓰니깐 se에서는 안되는데
