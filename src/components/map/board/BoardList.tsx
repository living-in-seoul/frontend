'use client';
import PostItem from '@/components/community/PostItem';
import SelectedLocation from '@/components/write/location/SelectedLocation';
import Link from 'next/link';
import useSWR from 'swr';

interface BoardListProps {
  markerIdValue: number | null;
}

const BoardList = ({ markerIdValue }: BoardListProps) => {
  const { data } = useSWR<ResponseBoardDetail>(
    markerIdValue !== null && `api/map/detail/${markerIdValue}`,
  );

  return (
    <article className="flex flex-col ">
      <div className="w-full h-full justify-between flex "></div>
      {markerIdValue && (
        <>
          {data?.result && (
            <Link href={`/detail/${markerIdValue}`}>
              <PostItem
                location={data.result.location}
                post={data.result.post}
                user={data.result.user}
                hasLiked
                onMap={true}
                border
              />
              <div className="w-full pl-2 h-16 border-t border-gray5 ">
                <SelectedLocation
                  lname={data.result.location.lname}
                  address={data.result.location.address}
                />
              </div>
            </Link>
          )}
        </>
      )}
    </article>
  );
};

export default BoardList;
