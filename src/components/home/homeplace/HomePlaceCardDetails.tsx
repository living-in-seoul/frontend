import { CongestionLevelElemet, findMaxPopulation } from '@/utils/utilFunc';
import Bar from './PlaceBar';
import Icons from '@/components/common/Icons';
import { back } from '@/utils/Icon';

interface HomePlaceCardDetailsProps {
  list: CityData;
  onClose: () => void;
}

const HomePlaceCardDetails = ({ list, onClose }: HomePlaceCardDetailsProps) => {
  const {
    PPLTN_RATE_10,
    PPLTN_RATE_20,
    PPLTN_RATE_30,
    PPLTN_RATE_40,
    PPLTN_RATE_50,
    PPLTN_RATE_60,
    MALE_PPLTN_RATE,
    FEMALE_PPLTN_RATE,
    RESNT_PPLTN_RATE,
    NON_RESNT_PPLTN_RATE,
    FCST_PPLTN,
    FCST_YN,
  } = list;
  let forecast;
  let hoursLater;

  if (FCST_YN === 'Y') {
    ({ forecast, hoursLater } = findMaxPopulation(FCST_PPLTN));
  } else {
    forecast = null;
    hoursLater = null;
  }
  const timeString = forecast ? new Date(forecast.FCST_TIME).getHours() : '';
  const congestionLevel = forecast ? forecast.FCST_CONGEST_LVL : '';
  const message = forecast
    ? `${timeString}시(${hoursLater}시간 후)에 인구가 제일 많고, 혼잡도는 ${congestionLevel}할 것으로 예상돼요.`
    : '예상 불가';
  const betterContent = (type: 'gender' | 'age' | 'residence') => {
    const man = parseFloat(MALE_PPLTN_RATE);
    const woman = parseFloat(FEMALE_PPLTN_RATE);
    const resnt = parseFloat(RESNT_PPLTN_RATE);
    const nonResnt = parseFloat(NON_RESNT_PPLTN_RATE);
    const rates = {
      '10대': parseFloat(PPLTN_RATE_10),
      '20대': parseFloat(PPLTN_RATE_20),
      '30대': parseFloat(PPLTN_RATE_30),
      '40대': parseFloat(PPLTN_RATE_40),
      '50대': parseFloat(PPLTN_RATE_50),
      '60대': parseFloat(PPLTN_RATE_60),
    };

    let highestRate = 0;
    let highestGroup = '';
    for (const [group, rate] of Object.entries(rates)) {
      if (rate > highestRate) {
        highestRate = rate;
        highestGroup = group;
      }
    }
    if (type === 'gender') {
      const genderDifference = Math.abs(man - woman).toFixed(1);
      return man > woman
        ? `남성이 여성보다 ${genderDifference}% 많아요`
        : `여성이 남성보다 ${genderDifference}% 많아요`;
    } else if (type === 'age') {
      return `전체 연령대 중 ${highestGroup}가 ${highestRate.toFixed(
        1,
      )}%로 가장 많아요.`;
    } else if (type === 'residence') {
      const residenceDifference = Math.abs(resnt - nonResnt).toFixed(1);
      return resnt > nonResnt
        ? `상주 인구가 비상주 인구보다 ${residenceDifference}% 많아요`
        : `비상주 인구가 상주 인구보다 ${residenceDifference}% 많아요`;
    }
  };

  return (
    <article className="flex flex-col w-96 pt-[30px] px-3 pb-9 bg-white rounded-xl shadow gap-7">
      <div className="w-full flex flex-col gap-7">
        {/* 혼잡도 추이 전망 */}
        <div className="flex w-full items-center">
          <Icons path={back} className="cursor-pointer" onClick={onClose} />
          <div
            className="w-full text-center text-stone-900 text-xl font-bold leading-loose"
            onClick={onClose}
          >
            혼잡도 추이 전망
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex w-full justify-between items-center">
            {/* 향후 12시간 컨테이너 */}
            <div className="min-w-[49.5%] flex flex-col grow items-center px-1 gap-3">
              <div className="text-center text-gray2 text-base font-semibold leading-loose">
                향후 12시간
              </div>
              <div
                className={`flex justify-center items-center w-20 h-20 ${
                  forecast
                    ? CongestionLevelElemet(forecast.FCST_CONGEST_LVL).color
                    : 'bg-slate-200'
                } rounded-full`}
              >
                <div className="text-center text-white text-xl font-semibold leading-loose">
                  {forecast
                    ? CongestionLevelElemet(forecast.FCST_CONGEST_LVL).text
                    : '없음'}
                </div>
              </div>
              <div>
                <p className="text-gray4 text-[10px] font-semibold">
                  {message}
                </p>
              </div>
            </div>
            <div className="w-[1px] h-full bg-gray6" />
            {/* 지난 12시간 컨테이너 */}
            <div className="min-w-[49.5%] flex flex-col grow items-center px-1 gap-3">
              <div className="text-center text-neutral-700 text-base font-semibold leading-loose">
                현재
              </div>
              <div
                className={`flex justify-center items-center w-20 h-20 ${
                  CongestionLevelElemet(list.AREA_CONGEST_LVL).color
                } rounded-full`}
              >
                <div className="text-center text-white text-xl font-semibold leading-loose">
                  {CongestionLevelElemet(list.AREA_CONGEST_LVL).text}
                </div>
              </div>
              <div>
                <p className="text-gray4 text-[10px] font-semibold">
                  {list.AREA_CONGEST_MSG}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 실시간 인구 구성 비율 */}
      <div className="w-full flex flex-col gap-7">
        <div className="text-center text-stone-900 text-xl font-bold leading-loose">
          실시간 인구 구성 비율
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-1.5">
            {/* 바 */}
            <Bar
              color="bg-indigo-600"
              gage={`${list.MALE_PPLTN_RATE}%`}
              title="남성"
            />
            <Bar
              color="bg-pink-500"
              gage={`${list.FEMALE_PPLTN_RATE}%`}
              title="여성"
            />

            <span className="text-neutral-500 text-xs font-semibold">
              ﹒ {betterContent('gender')}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <Bar title="10대" color="bg-red-500" gage={`${PPLTN_RATE_10}%`} />
            <Bar
              title="20대"
              color="bg-orange-400"
              gage={`${PPLTN_RATE_20}%`}
            />
            <Bar
              title="30대"
              color="bg-orange-300"
              gage={`${PPLTN_RATE_30}%`}
            />
            <Bar
              title="40대"
              color="bg-emerald-500"
              gage={`${PPLTN_RATE_40}%`}
            />
            <Bar
              title="50대"
              color="bg-indigo-600"
              gage={`${PPLTN_RATE_50}%`}
            />
            <Bar title="60대" color="bg-pink-500" gage={`${PPLTN_RATE_60}%`} />
            <span className="text-neutral-500 text-xs font-semibold">
              ﹒ {betterContent('age')}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <Bar
              title="상주"
              type="live"
              color="bg-orange-300"
              gage={`${RESNT_PPLTN_RATE}%`}
            />
            <Bar
              title="비상주"
              type="live"
              color="bg-emerald-500"
              gage={`${NON_RESNT_PPLTN_RATE}%`}
            />

            <span className="text-neutral-500 text-xs font-semibold">
              ﹒ {betterContent('residence')}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
export default HomePlaceCardDetails;
