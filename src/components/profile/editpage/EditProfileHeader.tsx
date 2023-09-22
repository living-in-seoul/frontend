import EditProfileThreeDot from './EditProfileThreeDot';
import Header from '@/components/layouts/Header';
import Back from '@/components/common/Back';

const EditProfileHeader = () => {
  return (
    <Header
      left={<Back />}
      center={<span className="font-bold">내 정보 수정</span>}
      right={<EditProfileThreeDot />}
    />
  );
};

export default EditProfileHeader;
