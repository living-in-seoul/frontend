import { DATAList, post } from '@/utils/dummydata';
import PostItem from './PostItem';
import ReviewItem from '../common/ReviewItem';

export interface CategoryPostListProps {
  selectCategory: string | null;
  image?: boolean;
}

const CategoryPostList = ({
  selectCategory,
  image = false,
}: CategoryPostListProps) => {
  // const data = await getPosts(selectCategory);

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
