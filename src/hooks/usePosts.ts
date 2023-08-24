import { AuthOpenModalState } from '@/recoil/authStates';
import { communityKeyState } from '@/recoil/communityStates';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR, { useSWRConfig } from 'swr';

const usePosts = () => {
  const communityKey = useRecoilValue(communityKeyState);
  const setAuthOpenModal = useSetRecoilState(AuthOpenModalState);
  const setCommunityKey = useSetRecoilState(communityKeyState);

  const { data: posts, isLoading } = useSWR<ResponseRegister>(
    communityKey,

    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: (data, key, config) => {
        setCommunityKey(key);
      },
    },
  );
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
