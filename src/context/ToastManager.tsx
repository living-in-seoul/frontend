'use client';
import { notificationState } from '@/recoil/authStates';
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useRecoilValue } from 'recoil';

const ToastManager = () => {
  const notification = useRecoilValue(notificationState);
  useEffect(() => {
    if (notification === null) return;
    toast.success('새로운 알림이 있습니다.');
  }, [notification]);
  return (
    <>
      <Toaster position={'top-center'} />
    </>
  );
};
export default ToastManager;
