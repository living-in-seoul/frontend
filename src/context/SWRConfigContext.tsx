'use client';
import { useRouter } from 'next/navigation';
import { SWRConfig } from 'swr';

interface SWRConfigContextProps {
  children: React.ReactNode;
}

const SWRConfigContext = ({ children }: SWRConfigContextProps) => {
  const router = useRouter();
  const fetcher = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.statusText === 'Forbidden') {
        router.replace('/signin');
      }
      // 오류 객체에 status와 statusText 포함
      throw {
        status: response.status,
        statusText: response.statusText,
        message: `Error ${response.status}: ${response.statusText}`,
      };
    }

    return response.json();
  };
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigContext;
