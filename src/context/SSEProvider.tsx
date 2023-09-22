'use client';
import React, { useEffect, useState, ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '@/recoil/authStates';
import { userClientVerify } from '@/service/user';

interface SSEProviderProps {
  children: ReactNode;
}

const SSEProvider = ({ children }: SSEProviderProps) => {
  const [user, setUser] = useState<boolean | null>(null);
  const setNotification = useSetRecoilState(notificationState);

  const fetchUser = async () => {
    const res = await userClientVerify();
    if (res?.status === 200) {
      setUser(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const eventSource = new EventSource('/api/sse');

    eventSource.onerror = (error: Event) => {
      if (eventSource.readyState !== EventSource.CONNECTING) {
        eventSource.close();
      }
    };

    eventSource.addEventListener('addNotification', (event: MessageEvent) => {
      const { timeStamp, data } = event;
      setNotification({ timeStamp, data });
    });

    return () => {
      eventSource.close();
    };
  }, [setNotification, user]);

  return <>{children}</>;
};

export default SSEProvider;
