import dynamic from 'next/dynamic';

const BeatLoader = dynamic(() => import('react-spinners/BeatLoader'), {
  ssr: true,
});

export default BeatLoader;
