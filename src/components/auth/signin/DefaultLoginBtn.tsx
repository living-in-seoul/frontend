import Button from '@/components/common/Button';
import BeatLoader from '@/components/common/Spinner';
const DefaultLoginBtn = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="absolute w-full bottom-0">
      <Button
        size="w-full"
        title={
          isLoading ? <BeatLoader size={10} color="#2DDAB0" /> : '로그인하기'
        }
        disabled={isLoading}
        bgColor="bg-teal-400"
        border="none"
        color="text-white"
        type="submit"
      />
    </div>
  );
};

export default DefaultLoginBtn;
