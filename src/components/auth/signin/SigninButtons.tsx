'use client';
import { socialUrls } from '@/utils/constants/auth';
import SocialAuth from './SocialAuth';
import { callbackUrlState } from '@/recoil/authStates';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const SigninButtons = ({ callbackUrl }: { callbackUrl: string }) => {
  const setCallbackUrl = useSetRecoilState(callbackUrlState);
  useEffect(() => {
    setCallbackUrl(callbackUrl);
  }, []);
  return (
    <div className="mt-5 flex flex-col gap-3 ">
      {socialUrls.map(({ text, url, bgColor, color, active }, index) => (
        <SocialAuth
          key={`${text}${index} `}
          text={text}
          url={url}
          bgColor={bgColor}
          color={color}
          active={active}
        />
      ))}
    </div>
  );
};

export default SigninButtons;
