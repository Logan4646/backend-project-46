import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import parsers from '../src/parsers.js';
import format from '../src/formatters/index.js';
import stylish from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('testing result for tree files json', () => {
  const expected = readFile('testFile.txt');
  const actual = genDiff(getFixturePath('treefile1.json'), getFixturePath('treefile2.json'), 'stylish');
  expect(actual).toBe(expected);
});
test('testing result for tree files yml', () => {
  const expected = readFile('testFile.txt');
  const actual = genDiff(getFixturePath('treefile1.yml'), getFixturePath('treefile2.yml'));
  expect(actual).toBe(expected);
});
test('testing stylish for plain files throw parsers', () => {
  expect(() => parsers('mjs')).toThrow('Формат не поддерживается: mjs');
});
test('testing format for throw formatters', () => {
  const a = [{ type: '1' }];
  expect(() => format(a, 2)).toThrow('Формат не поддерживается: 2');
});
test('testing format for json', () => {
  const a = { x: 5 };
  const b = format(a, 'json');
  expect(b).toBe('{"x":5}');
});
test('testing stylish for throw wrong type', () => {
  const a = [{ type: 'sam' }];
  expect(() => stylish(a)).toThrow(new Error('Этого типа не существует: sam'));
});
