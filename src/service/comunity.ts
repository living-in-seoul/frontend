export const getCommunityList = async (category: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/posts/get?size=10&page=1`,
  ).then((res) => res.json());

  return response;
};
