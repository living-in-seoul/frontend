'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#ACECDC"
        options={{ showSpinner: false }}
      />
    </>
  );
};

export default ProgressBarProviders;
