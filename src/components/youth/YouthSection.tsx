import { Suspense } from 'react';
import HomeSectionTitle from '../home/HomeSectionTitle';
import YouthList from './YouthList';
import { PlaceCardSkeleton } from '../home/homeplace/HomePlaceCard';
import { getYouth } from '@/service/home';

const YouthSection = async () => {
  const youthListPromise = await getYouth();
  return <YouthList youthList={youthListPromise} />;
};
export default YouthSection;
