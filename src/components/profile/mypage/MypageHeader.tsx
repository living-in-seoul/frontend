import AlertButtonComponent from '@/components/home/AlertButtonComponent';

const MypageHeader = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <span className="font-semibold text-base">마이페이지</span>
      <AlertButtonComponent link="/alert" type="community" />
    </div>
  );
};

export default MypageHeader;
