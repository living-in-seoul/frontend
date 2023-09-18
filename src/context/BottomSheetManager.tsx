import dynamic from 'next/dynamic';

const DynamicBottomSheet = dynamic(
  () => import('@/components/common/BottomSheet'),
);

const BottomSheetManager = () => {
  return <DynamicBottomSheet />;
};
export default BottomSheetManager;
