const xml2js = require('xml2js');

/** 청년정책 가져오기 */
export const getYouth = async () => {
  const parser = new xml2js.Parser();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_YOUTH_URL}openApiVlak=${process.env.NEXT_PUBLIC_YOUTH_API_KEY}&display=10&pageIndex=1`,
  ).then((response) => response.text());
  const parseRes = await parser.parseStringPromise(response);

  return parseRes;
};
