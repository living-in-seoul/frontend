/** 청년정책 가져오기 */
export const getYouth = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_YOUTH_URL}openApiVlak=${process.env.NEXT_PUBLIC_YOUTH_API_KEY}&display=10&pageIndex=1`,
  );
  console.log('이게 제대로 들어오긴 하니?', response);
  return;
};
