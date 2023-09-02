import { useEffect } from 'react';

type EventType = string;

function useSSE(url: string, eventTypes: EventType[]) {
  useEffect(() => {
    const eventSource = new EventSource(url, { withCredentials: true });

    eventSource.onopen = (event) => console.log('SSE 연결 완료');
    eventSource.onerror = (error) => {
      console.error('SSE 연결 실패 에러', error);
      if (eventSource.readyState !== EventSource.CONNECTING) {
        eventSource.close();
      }
    };
    eventSource.onmessage = (event) => {
      console.log('서버에서 메세지', event.data);
    };

    // eventTypes가 배열인지 확인
    if (Array.isArray(eventTypes)) {
      eventTypes.forEach((type) => {
        eventSource.addEventListener(type, (event) => {
          console.log(`${type} from server`, event.data);
          // 서버에서 특정 이벤트를 받으면 알림 추가
        });
      });
    }

    return () => {
      eventSource.close();
      console.log('서버 닫힘');
    };
  }, [url, eventTypes]);
}

export default useSSE;
