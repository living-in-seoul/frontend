'use client';
import useSWR from 'swr';
export default function Home() {
  const { data, isLoading, error } = useSWR(`/api/youth`);
  console.log(data);
  return (
    <>
      <button>sadf</button>
    </>
  );
}
