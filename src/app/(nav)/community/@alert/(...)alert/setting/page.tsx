import AlertSettingComponent from '@/components/alert/setting/AlertSettingComponent';
import Modal from '@/components/layouts/Modal';
import dynamic from 'next/dynamic';

const DynamicAlertSettingComponent = dynamic(
  () => import('@/components/alert/setting/AlertSettingComponent'),
  { ssr: false },
);
const SettingPage = () => {
  return (
    <Modal>
      <DynamicAlertSettingComponent />
    </Modal>
  );
};
export default SettingPage;
