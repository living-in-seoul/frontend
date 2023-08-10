import { oauthHandler } from '@/service/oauth';
import React from 'react';
import SocialIcons from '../common/SocialIcon';

export const socialhandler = () => {
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&access_type=offline&include_granted_scopes=true&response_type=code&state=google&redirect_uri=http://localhost:3000/auth&client_id=500936602674-vrj3f1miuhi8kr6v1t1phm3e6fjmf5tv.apps.googleusercontent.com`;
};

const SocialAuth = () => {
  return (
    <form action={oauthHandler}>
      <button type="submit" className="flex flex-row items-center border">
        <span>구글 소셜로그인</span>
        <SocialIcons />
      </button>
    </form>
  );
};

export default SocialAuth;
