import Link from 'next/link';
import CurrentLocation from './CurrentLocation';
import WriteButton from './WriteButton';

const ActionButtons = () => {
  return (
    <section className="flex flex-col justify-between absolute bottom-48 right-5 h-28">
      <Link href={'/write'}>
        <WriteButton section="map" />
      </Link>
      <CurrentLocation />
    </section>
  );
};

export default ActionButtons;
