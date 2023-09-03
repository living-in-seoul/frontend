'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
interface Req {
  searchParams: {
    state: string;
    code: string;
    scope: string;
  };
}

const CallbackPage = (req: Req) => {
  const router = useRouter();
  const { searchParams } = req;
  const { code, state } = searchParams;
  useEffect(() => {
    const fetchs = async () => {
      try {
        await fetch('/api/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, state }),
        })
          .then((response) => response.json())
          .then((response) => {
            localStorage.setItem('nickname', response.nickname);
            if (response.hasSignup) {
              return router.push('/home');
            }
            return router.push('/signup/second');
          });
      } catch {
        throw new Error();
      }
    };
    fetchs();
  }, [code, router, state]);
  return <div></div>;
};

export default CallbackPage;
