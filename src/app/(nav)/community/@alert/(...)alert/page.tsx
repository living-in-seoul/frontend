import AlertComponent from '@/components/alert/AlertComponent';
import Modal from '@/components/layouts/Modal';
import dynamic from 'next/dynamic';

const DynamicAlertComponent = dynamic(
  () => import('@/components/alert/AlertComponent'),
  { ssr: false },
);

const AlertPage = () => {
  return (
    <Modal>
      <DynamicAlertComponent />
    </Modal>
  );
};
export default AlertPage;
