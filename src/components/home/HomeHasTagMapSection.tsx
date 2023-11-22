'use client';
import Link from 'next/link';
import PostItem from '@/components/community/PostItem';
import MapProvider from '@/context/MapProvider';
import SelectedLocation from '../write/location/SelectedLocation';
import HomeHashtagMap from './HomeHashtagMap';

export const MockHasTagMapContent = () => (
  <>
    <div className="relative w-full p-4">
      <div className="skeleton bg-gray-200 w-full h-[260px] border overflow-hidden rounded-xl" />
    </div>
  </>
);

const HomeHasTagMapSection = ({ postList }: { postList: ResponsePost[] }) => {
  const { location, post } = postList[0];
  return (
    <>
      <MapProvider type={'home'}>
        <div className="w-full p-4">
          <HomeHashtagMap location={location} />
        </div>
      </MapProvider>

      <div className="flex flex-col w-full">
        <div key={post.postId}>
          <Link
            key={post.postId}
            href={`/detail/${post.postId}`}
            className="cursor-pointer hover:bg-zinc-200 transition-all duration-200 active:bg-zinc-200"
          >
            <PostItem {...postList[0]} border />
          </Link>
        </div>
        <div className="py-7 px-3">
          <SelectedLocation lname={location.lname} address={location.address} />
        </div>
      </div>
    </>
  );
};
export default HomeHasTagMapSection;
