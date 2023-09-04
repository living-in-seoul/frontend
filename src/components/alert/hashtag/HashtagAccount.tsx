import { handleSubmit } from '@/actions/fetchHashtag';
import Button from '@/components/common/Button';

const HashtagAccount = () => {
  return (
    <form
      action={handleSubmit}
      className="flex w-full justify-between py-[17px] border-b border-gray5"
    >
      <input
        type="text"
        placeholder="등록할 #해시태그를 입력해 주세요"
        name="hashtag"
        autoFocus
        className="placeholder:text-sm placeholder:text-gray5 grow active:border-none focus:outline-none"
      />
      <Button
        title="등록"
        size="xsmall"
        bgColor="bg-primary"
        textColor="white"
        select
        type="submit"
      />
    </form>
  );
};
export default HashtagAccount;
