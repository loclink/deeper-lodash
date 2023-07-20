import { expect, test } from 'vitest';
import { deepOmitNil, deepOmitByKeys, deepOmitByValues } from '../src/index';

test('deepOmitNil', () => {
  expect(deepOmitNil([undefined, 1, 2, { name: 'aa', age: null }])).toStrictEqual([1, 2, { name: 'aa' }]);
});

test('deepOmitByKeys', () => {
  expect(deepOmitByKeys({ aa: '' }, ['aa'])).toStrictEqual({});
});
