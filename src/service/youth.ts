import { Parser } from 'xml2js';

/** 청년정책 가져오기 */
export const getYouth = async () => {
  const xml2js = require('xml2js');
  const parser = new xml2js.Parser();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_YOUTH_URL}openApiVlak=${process.env.NEXT_PUBLIC_YOUTH_API_KEY}&display=10&pageIndex=1&srchPolyBizSecd=003002001`,
  ).then((response) => response.text());
  const parseRes = await parser.parseStringPromise(response);
  return parseRes;
};
