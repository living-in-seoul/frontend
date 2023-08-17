export const getCommunityList = async (tag: string, type: CategoryType) => {
  const tagname = type === 'location' ? 'locationTagName' : 'purposeTagName';
  const Apiname = type === 'location' ? 'locationTagsAll' : 'purposeTagsAll';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/${Apiname}?${tagname}=${tag}&size=3&page=1`,
  ).then((res) => res.json());

  return response;
};
