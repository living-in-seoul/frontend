import Link from 'next/link';
import CurrentLocation from './CurrentLocation';
import WriteButton from './WriteButton';

const ActionButtons = () => {
  return (
    <section className=" flex flex-col justify-between absolute z-10 bottom-48 right-4 h-24">
      <Link href={'/write'}>
        <WriteButton />
      </Link>
      <CurrentLocation />
    </section>
  );
};

export default ActionButtons;
