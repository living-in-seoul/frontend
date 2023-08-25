import { AuthOpenModalState } from '@/recoil/authStates';
import { communityKeyState } from '@/recoil/communityStates';
import { usePathname, useSearchParams } from 'next/navigation';
import { RecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR, { useSWRConfig } from 'swr';

const usePosts = (state: RecoilState<string>) => {
  const communityKey = useRecoilValue(state);
  const setAuthOpenModal = useSetRecoilState(AuthOpenModalState);
  const setPostKey = useSetRecoilState(state);

  const { data: posts, isLoading } = useSWR<ResponseRegister>(communityKey, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess: (data, key, config) => {
      console.log(data, key);
      setPostKey(key);
    },
  });
  const { mutate } = useSWRConfig();
  const setLike = (postId: number) => {
    fetch(`/api/community/like`, {
      method: 'POST',
      body: JSON.stringify({ postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status === 200) {
        mutate(communityKey);
        return res.json();
      } else if (res.status === 401) {
        setAuthOpenModal(true);
        document.body.style.overflow = 'hidden';
      } else {
        // throw new Error(res.statusText);
      }
    });
  };

  return { posts, isLoading, setLike };
};
export default usePosts;
