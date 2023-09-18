'use client';
import { notificationState } from '@/recoil/authStates';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useRecoilValue } from 'recoil';

const ToastManager = () => {
  const notification = useRecoilValue(notificationState);
  const pathname = usePathname();
  useEffect(() => {
    if (notification === null) return;
    toast.success('새로운 알림이 있습니다.');
  }, [notification]);

  return (
    <>
      {pathname === '/map' ? (
        <Toaster position={'bottom-center'} />
      ) : (
        <Toaster position={'top-center'} toastOptions={{ duration: 1000 }} />
      )}
    </>
  );
};
export default ToastManager;
