import { fetchTodaySearch } from '@/actions/fetchCommunity';

const ManySearchToday = async () => {
  const todaySearch = await fetchTodaySearch();

  return (
    <section className="pt-[20px]">
      <div className="w-full text-black text-base font-semibold leading-none">
        많이 검색되고 있는 해시태그예요
      </div>
      <div className="w-full text-zinc-400 p-1.5 text-xs font-normal leading-none">
        2023.08.24 10:00 기준
      </div>
      <ul className="py-5 columns-2 gap-x-3">
        {todaySearch &&
          todaySearch.map((item, index) => (
            <li
              key={item}
              className="flex items-center gap-[18px] cursor-pointer mb-2.5"
            >
              <div className="text-zinc-400 text-sm font-semibold">
                {index + 1}
              </div>

              <span className="text-black text-xs font-medium leading-3">
                {item}
              </span>
            </li>
          ))}
      </ul>
    </section>
  );
};
export default ManySearchToday;
