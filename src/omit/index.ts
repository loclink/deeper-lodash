import { isArray, isPlainObject, forEach, omitBy, filter, cloneDeep, includes, omit } from 'lodash';
import { OmitFnDataType } from './types';

/**
 * 根据key深度递归从对象中排除
 * @param data
 * @param keys
 * @returns
 */
export const deepOmit = (data: OmitFnDataType, ...keys: string[]) => {
  if (!isArray(data) && !isPlainObject(data)) return data;
  let finalData: object = cloneDeep(data);
  if (isPlainObject(finalData)) {
    finalData = omit(finalData, keys);
  }
  forEach(finalData, (value, key) => {
    if (isArray(value) || isPlainObject(value)) {
      finalData[key] = deepOmit(value, ...keys);
    }
  });

  return finalData;
};

/**
 * 根据value深度递归从数组或对象中排除匹配值
 * @param data
 * @param props
 * @returns
 */
export const deepOmitBy = (data: OmitFnDataType, ...props: (string | number | boolean | undefined | null)[]) => {
  if (!isArray(data) && !isPlainObject(data)) return data;
  let finalData: object = cloneDeep(data);
  if (isArray(finalData)) {
    finalData = filter(finalData, (value) => !includes(props, value));
  } else if (isPlainObject(finalData)) {
    finalData = omitBy(finalData, (value) => includes(props, value));
  }

  forEach(finalData, (value, key) => {
    if (isArray(value) || isPlainObject(value)) {
      finalData[key] = deepOmitBy(value, ...props);
    }
  });

  return finalData;
};

/**
 * 从数组或对象深度递归排除空值，如 null 和 undefined 以及 NaN
 * @param data
 * @returns
 */
export const deepOmitNil = (data: OmitFnDataType) => {
  return deepOmitBy(data, undefined, null, NaN);
};
