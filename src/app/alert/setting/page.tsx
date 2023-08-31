import dynamic from 'next/dynamic';

const DynamicAlertSettingComponent = dynamic(
  () => import('@/components/alert/setting/AlertSettingComponent'),
  { ssr: false, loading: () => <>loading...</> },
);
const SettingPage = () => {
  return <DynamicAlertSettingComponent />;
};
export default SettingPage;
