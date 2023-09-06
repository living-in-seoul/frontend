/** 청년정책 가져오기 */

import { CODES_TYPE } from '@/utils/constants/constants';

export const getYouth = async () => {
  const xml2js = require('xml2js');
  const parser = new xml2js.Parser();

  const promises = CODES_TYPE.map((code) => {
    const url = `${process.env.NEXT_PUBLIC_YOUTH_URL}openApiVlak=${process.env.NEXT_PUBLIC_YOUTH_API_KEY}&display=1&pageIndex=1&srchPolyBizSecd=003002001&bizTycdSel=${code.code}`;
    return fetch(url)
      .then((res) => res.text())
      .then((text) => parser.parseStringPromise(text));
  });

  const result = await Promise.allSettled(promises);
  const successfulResults = result
    .filter(
      (res): res is PromiseFulfilledResult<any> => res.status === 'fulfilled',
    )
    .map((res) => res.value.youthPolicyList.youthPolicy);

  return successfulResults;
};
