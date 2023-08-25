const SignupWelcome = ({ slug }: { slug: string }) => {
  return (
    <div>
      <div className="flex flxe-row justify-between items-center">
        <div className="text-neutral-700 text-2xl font-semibold leading-10">
          {slug === 'first' ? '회원가입 필수사항' : '회원가입 선택사항'}
        </div>{' '}
        <div className="relative flex flex-row w-20 justify-between">
          {slug === 'first' ? (
            <>
              <div className="w-8 h-8 bg-teal-400 rounded-full flex justify-center items-center">
                <span className="text-white text-sm font-normal">1</span>
              </div>
              <div className="w-8 h-8 bg-white rounded-full border border-teal-400 flex justify-center items-center">
                <div className="text-teal-400 text-sm font-normal">2</div>
              </div>
            </>
          ) : (
            <>
              <div className="w-8 h-8 bg-white rounded-full border border-teal-400 flex justify-center items-center">
                <div className="text-teal-400 text-sm font-normal">1</div>
              </div>
              <div className="w-8 h-8 bg-teal-400 rounded-full flex justify-center items-center">
                <span className="text-white text-sm font-normal">2</span>
              </div>
            </>
          )}
          <div className="absolute top-0 w-full h-4 border-b border-b-teal-400 -z-10" />
        </div>
      </div>
      <div className="text-neutral-400 text-sm font-normal leading-7">
        {slug === 'first'
          ? '아래 사항을 모두 입력해 주세요'
          : '가입 시 맞춤화된 정보를 제공해 드려요'}
      </div>
    </div>
  );
};

export default SignupWelcome;
