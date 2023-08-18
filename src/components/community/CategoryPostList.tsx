import { DATAList, post } from '@/utils/dummydata';
import PostItem from './PostItem';
import useSWR from 'swr';
import ReviewItem from '../item/ReviewItem';
export interface CategoryPostListProps {
  selectCategory: string | null;
  image?: boolean;
  type?: CategoryType;
}

const CategoryPostList = ({
  selectCategory,
  image = false,
  type,
}: CategoryPostListProps) => {
  const { data: details, isLoading } = useSWR(
    `/api/community/${selectCategory}/${type}`,
  );

  return (
    <div>
      {DATAList.map((item) => {
        if (image) {
          return <ReviewItem {...post} key={item.board.postId} />;
        }

        return (
          <PostItem
            {...item}
            key={item.board.postId}
            selectCategory={selectCategory}
          />
        );
      })}
    </div>
  );
};
export default CategoryPostList;
