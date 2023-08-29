'use client';
import useSWR from 'swr';

const Youth = () => {
  const { data, isLoading, error } = useSWR(`/api/youth`);
  console.log(data);

  return <div>{data && data[0]?.rqutUrla}</div>;
};

export default Youth;
