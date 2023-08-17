import Icons from './Icons';
const path = {
  path: 'M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z',
  width: 12,
  height: 12,
};

const useCreateStart = (rating: number | undefined) => {
  let star = [];
  for (let i = 0; i < 5; i++) {
    if (rating && i < rating) {
      star.push('star');
    } else {
      star.push('unstar');
    }
  }
  return star;
};

const StarRate = ({ rating }: { rating: number | undefined }) => {
  const stars = useCreateStart(rating);

  return (
    <>
      <div className="flex items-center ">
        {stars.map((star, index) =>
          star === 'star' ? (
            <Icons key={`${star}${index}`} path={path} />
          ) : (
            <Icons key={`${star}${index}`} path={path} fill="none" />
          ),
        )}
      </div>
      <div className=" text-black text-sm font-normal leading-loose">
        {rating && (
          <span className="border-r-2 pr-2 border-stone-300">{rating}</span>
        )}
      </div>
    </>
  );
};

export default StarRate;
