import HomeHomeTownSection from '@/components/home/hometown/HomeHomeTown';
import { getHotTagHomeTown } from '@/service/home';

const HomeTownPage = async () => {
  const homeTownTagPromise = await getHotTagHomeTown();

  return <HomeHomeTownSection HotTagHomeTown={homeTownTagPromise} />;
};
export default HomeTownPage;
