'use client';

import Select from '@/components/common/Select';
import { Close } from '@/components/profile/editpage/EditImageIcon';
import { Toaster, toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
interface InsertTagItemProps {
  tag: string;
}
const InsertTagItem = ({ tag }: InsertTagItemProps) => {
  const { mutate } = useSWRConfig();
  const delhashtag = async () => {
    const body = {
      hashtagName: tag,
    };
    console.log(body);
    const res = await fetch(`/api/alert`, {
      method: 'DELETE',
      body: JSON.stringify(body),
    }).then(() => {
      mutate('/api/alert');
      toast.success(`${body.hashtagName} 삭제완료`);
    });
  };

  return (
    <li>
      <Select
        title={`${tag}`}
        className="rounded-md"
        disable
        Icon={<Close onClick={delhashtag} />}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </li>
  );
};
export default InsertTagItem;
