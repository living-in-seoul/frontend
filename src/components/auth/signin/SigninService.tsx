import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SigninService = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-center gap-6 ">
      <div
        className="border-b text-[10px] text-zinc-400"
        onClick={() => toast.error('서비스 준비중입니다')}
      >
        비밀번호 찾기
      </div>
      <div
        className="border-b text-[10px] text-zinc-400"
        onClick={() => router.replace('/signup/first')}
      >
        이메일로 회원가입
      </div>
    </div>
  );
};

export default SigninService;
