'use client';
import { oauthHandler } from '@/service/oauth';
import React from 'react';
import SocialIcons from './SocialIcon';
interface SocialAuthProps {
  text: string;
  url: string;
}

const SocialAuth = ({ text, url }: SocialAuthProps) => {
  return (
    <form action={() => oauthHandler(url)}>
      <button type="submit" className="flex flex-row items-center border">
        <span>{text} 소셜로그인</span>
        <SocialIcons text={text} />
      </button>
    </form>
  );
};

export default SocialAuth;
