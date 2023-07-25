import { isArray, isPlainObject, forEach, omitBy, filter, cloneDeep, includes, omit } from 'lodash';
import { OmitFnDataType } from './types';
export * from './types';
/**
 * Recursively match key filtering
 * @param data - Array or plain object, i.e., an object created by the object constructor or an object with a prototype of null.
 * @param keys - Keys to be filtered
 * @returns
 */
export const deepOmitByKeys = (data: OmitFnDataType, keys: string[]) => {
  if (!isArray(data) && !isPlainObject(data)) return data;
  let finalData: object = cloneDeep(data);
  if (isPlainObject(finalData)) {
    finalData = omit(finalData, keys);
  }
  forEach(finalData, (value, key) => {
    if (isArray(value) || isPlainObject(value)) {
      finalData[key] = deepOmitByKeys(value, keys);
    }
  });

  return finalData;
};

/**
 * Recursively match value filtering
 * @param data - Array or plain object, i.e., an object created by the object constructor or an object with a prototype of null.
 * @param props - Values to be filtered
 * @returns
 */
export const deepOmitByValues = (data: OmitFnDataType, props: (string | number | boolean | undefined | null)[]) => {
  if (!isArray(data) && !isPlainObject(data)) return data;
  let finalData: object = cloneDeep(data);
  if (isArray(finalData)) {
    finalData = filter(finalData, (value) => !includes(props, value));
  } else if (isPlainObject(finalData)) {
    finalData = omitBy(finalData, (value) => includes(props, value));
  }

  forEach(finalData, (value, key) => {
    if (isArray(value) || isPlainObject(value)) {
      finalData[key] = deepOmitByValues(value, props);
    }
  });

  return finalData;
};

/**
 * Recursively filter out empty values
 * @param data - Array or plain object, i.e., an object created by the object constructor or an object with a prototype of null.
 * @example
 * ```typescript
  import { deepOmitNil } from 'deeper-lodash';
  deepOmitNil({
    name: 'loclink',
    age: 18,
    aaa: undefined,
    bbb: null,
    ccc: NaN,
    ddd: [
      undefined,
      {
        name: 'qwe'
      }
    ]
  });
  // => {
  //     "name": "loclink",
  //     "age": 18,
  //     "ddd": [
  //         {
  //             "name": "qwe"
  //         }
  //     ]
  //   }
 ```
 * @returns
 *
 */
export const deepOmitNil = (data: OmitFnDataType) => {
  return deepOmitByValues(data, [undefined, null, NaN]);
};
