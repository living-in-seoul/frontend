'use client';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginPage = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};
export default GoogleLoginPage;
