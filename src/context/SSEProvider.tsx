'use client';
import React, { createContext, useEffect, ReactNode, useContext } from 'react';

// SSE로부터 받는 데이터의 타입을 정의해주세요.
type SSEData = any;

const SSEContext = createContext<SSEData | null>(null);

interface SSEProviderProps {
  url: string;
  eventTypes: string[];
  children: ReactNode;
}

const SSEProvider: React.FC<SSEProviderProps> = ({
  url,
  eventTypes,
  children,
}) => {
  useEffect(() => {
    const eventSource = new EventSource(url, { withCredentials: true });

    eventSource.onopen = () => console.log('SSE 연결 완료');
    eventSource.onerror = (error) => {
      console.error('SSE 연결 실패', error);
      if (eventSource.readyState !== EventSource.CONNECTING) {
        eventSource.close();
      }
    };

    eventTypes.forEach((type) => {
      eventSource.addEventListener(type, (event) => {
        console.log(`${type} from server`, event.data);
        // 이벤트를 Context를 통해 하위 컴포넌트에 전달하는 로직 추가
      });
    });

    return () => {
      eventSource.close();
      console.log('서버 닫힘');
    };
  }, [url, eventTypes]);

  return (
    <SSEContext.Provider value={null /* 이 부분에 실제 SSE 데이터를 전달 */}>
      {children}
    </SSEContext.Provider>
  );
};

export const useSSE = () => {
  const context = useContext(SSEContext);
  if (!context) {
    throw new Error('useSSE must be used within an SSEProvider');
  }
  return context;
};

export default SSEProvider;
