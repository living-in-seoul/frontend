import Icons from '@/components/common/Icons';
import { HomePrev } from '@/utils/Icon';
import Link from 'next/link';

interface HomeSectionTitleProps {
  title: string;
  link?: string;
}

const HomeSectionTitle = ({ title, link }: HomeSectionTitleProps) => {
  return (
    <div className="flex justify-between py-6 px-4">
      <div className="text-black text-lg font-semibold leading-loose">
        {title}
      </div>
      {link && (
        <Link href={link} className="flex gap-2 items-center justify-center">
          <span className="text-neutral-500 text-xs font-medium leading-loose">
            더보기
          </span>
          <Icons path={HomePrev} fill="none" option={{ fill: '#787878' }} />
        </Link>
      )}
    </div>
  );
};
export default HomeSectionTitle;
