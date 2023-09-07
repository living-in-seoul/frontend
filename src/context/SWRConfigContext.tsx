'use client';
import { useRouter } from 'next/navigation';
import { SWRConfig } from 'swr';

interface SWRConfigContextProps {
  children: React.ReactNode;
}

const SWRConfigContext = ({ children }: SWRConfigContextProps) => {
  const fetcher = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.statusText === 'Forbidden') {
      }
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
