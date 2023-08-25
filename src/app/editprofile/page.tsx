import EditProfileHeader from '@/components/profile/editpage/EditProfileHeader';
import EditProfileImage from '@/components/profile/editpage/EditProfileImage';
import EditProfileInfo from '@/components/profile/editpage/EditProfileInfo';

const EditProfilePage = () => {
  return (
    <section>
      <EditProfileHeader />
      <EditProfileImage />
      <EditProfileInfo />
    </section>
  );
};
export default EditProfilePage;
