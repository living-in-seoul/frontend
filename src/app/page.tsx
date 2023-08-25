'use client';
import useSWR from 'swr';
export default function Home() {
  const { data, isLoading, error } = useSWR(`/api/youth`);

  return (
    <>
      <button>sadf</button>
    </>
  );
}
