import Link from 'next/link';
import NoneItem from '@/components/NoneItem';

export default function NotFound() {
  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center">
        <NoneItem
          title="404 에러"
          description="현재 페이지는 없는페이지입니다."
        />
      </div>
      <Link href="/home">홈으로가기</Link>
    </div>
  );
}
