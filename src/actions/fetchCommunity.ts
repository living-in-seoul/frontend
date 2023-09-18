import { categoryKO } from '@/utils/utilFunc';

interface FetchCommunityProps {
  page: number | string;
  limit: number;
  category: string;
  tags?: string | never[] | null;
  ordertype: SelectPopType;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER;

const fetchFromAPI = async (url: string) => {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching', error);
    return null;
  }
};

export const fetchCommunity = async (
  props: FetchCommunityProps,
): Promise<ResponseRegister | null> => {
  const { page, limit, category, tags, ordertype = 'newer' } = props;
  const tag = tags ?? '';
  const UrlEncodigTag = typeof tag === 'string' && encodeURIComponent(tag);

  const endpoint =
    category === 'All'
      ? `/tags/posts?category=&hashtagName=${UrlEncodigTag}&size=${limit}&page=${page}&type=${ordertype}`
      : `/tags/posts?category=${categoryKO(
          category,
        )}&hashtagName=${tag}&size=${limit}&page=${page}&type=${ordertype}`;

  return fetchFromAPI(`${BASE_URL}${endpoint}`);
};

export const fetchTodaySearch = async () => {
  return fetchFromAPI(`${BASE_URL}/search/today`);
};

export const fetchTodaySearchPost = async (userSearch: string) => {
  const endpoint = `${BASE_URL}/search/save`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ query: userSearch }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching', error);
    return null;
  }
};
