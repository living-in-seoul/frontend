'use server';

import { categoryKO } from '@/utils/utilFunc';

interface fetchCommunityProps {
  page: number | string;
  limit: number;
  type?: 'All' | 'Category';
  category: string;
  tags?: string | never[] | null;
  ordertype: 'newer' | 'popular';
}

export const fetchCommunity = async ({
  page,
  limit,
  category,
  tags,
  ordertype = 'newer',
}: fetchCommunityProps) => {
  console.log(page, limit, category, tags, ordertype);
  const tag = tags ?? '';
  const UrlEncodigTag = typeof tag === 'string' && encodeURIComponent(tag);
  if (category === 'All') {
    const Allapi = `${
      process.env.NEXT_PUBLIC_SERVER
    }/tags/posts?category=&hashtagName=${UrlEncodigTag}&size=${limit}&page=${page}&type=${'newer'}`;
    try {
      const respoense = await fetch(Allapi, {
        next: { revalidate: 0 },
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await respoense.json();
      return data as ResponseRegister;
    } catch (error) {
      console.error('Error fetching');
      console.log(error);
    }
  }

  const CategoryApi = `${
    process.env.NEXT_PUBLIC_SERVER
  }/tags/posts?category=${categoryKO(
    category,
  )}&hashtagName=${tag}&size=${limit}&page=${page}&type=${ordertype}`;

  try {
    const respoense = await fetch(CategoryApi, {
      next: { revalidate: 0 },
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await respoense.json();
    return data as ResponseRegister;
  } catch (error) {
    console.error('Error fetching');
    console.log(error);
  }
};

export const fetchTodaySearch = async () => {
  const TodaySearchApi = `${process.env.NEXT_PUBLIC_SERVER}/search/today`;

  try {
    const respoense = await fetch(TodaySearchApi, {});
    const data = await respoense.json();
    return data as string[];
  } catch (error) {
    console.error('Error fetching');
    console.log(error);
  }
};
