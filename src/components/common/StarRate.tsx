import Icons from './Icons';

const StarRate = () => {
  const path = {
    path: 'M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z',
    width: 12,
    height: 12,
  };
  return (
    <>
      <div className="flex items-center ">
        <Icons path={path} />
        <Icons path={path} />
      </div>
    </>
  );
};

export default StarRate;
