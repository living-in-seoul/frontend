import { socialUrls } from '@/utils/constants/auth';
import SocialAuth from './SocialAuth';

const SigninButtons = () => {
  return (
    <div className="mt-5 flex flex-col gap-3 ">
      {socialUrls.map(({ text, url, bgColor, color }, index) => (
        <SocialAuth
          key={`${text}${index} `}
          text={text}
          url={url}
          bgColor={bgColor}
          color={color}
        />
      ))}
    </div>
  );
};

export default SigninButtons;
