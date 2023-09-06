'use client';
import { useState, useEffect } from 'react';

const Bar = ({
  title,
  gage,
  color,
  type,
}: {
  title: string;
  gage: string;
  color: string;
  type?: string;
}) => {
  // Initialize the gage value to 0%
  const [currentGage, setCurrentGage] = useState('0%');

  useEffect(() => {
    // Update the gage value after the component is mounted
    setTimeout(() => {
      setCurrentGage(gage);
    }, 0);
  }, [gage]);

  return (
    <div className="w-full flex gap-2 items-center">
      <div
        className={`${
          type === 'live' ? 'w-14' : 'w-10'
        } text-neutral-700 text-base font-semibold`}
      >
        {title}
      </div>
      <div className="grow h-4 bg-zinc-100 rounded-tr-3xl rounded-br-3xl">
        <div
          style={{ width: currentGage }}
          className={`${color} h-4 rounded-tr-3xl rounded-br-3xl px-2 transition-all ease-in-out duration-500`}
        >
          <div className="text-right text-white text-xs font-semibold">
            {gage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bar;
