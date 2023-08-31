import dynamic from 'next/dynamic';

const BeatLoader = dynamic(() => import('react-spinners/BeatLoader'), {
  ssr: false,
});

export default BeatLoader;
