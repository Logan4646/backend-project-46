import fs from 'fs';
import path from 'path';

import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 });
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data1, key)) {
      return { type: 'add', key, val: value2 };
    }
    if (!_.has(data2, key)) {
      return { type: 'remove', key, val: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'recursion', key, children: buildTree(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'updated', key, val1: value1, val2: value2,
      };
    }
    return { type: 'same', key, val: value1 };
  });
};

const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename.trim()), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);
	const obj1 = JSON.parse(fileContent1);
	const obj2 = JSON.parse(fileContent2);
  const innerTree = buildTree(obj1, obj2);
  return innerTree;
};
export default genDiff;
