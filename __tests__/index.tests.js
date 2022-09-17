import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import parsers from '../src/parsers.js';
import format from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('testing stylish for plain files json', () => {
  const expected = readFile('testFile.txt');
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toBe(expected);
});
test('testing stylish for plain files yml', () => {
  const expected = readFile('testFile.txt');
  const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(actual).toBe(expected);
});
test('testing stylish for plain files throw parsers', () => {
  expect(() => parsers('mjs')).toThrow('Формат не поддерживается: mjs');
});
test('testing stylish for plain files throw formatters', () => {
  const a = [{ type: '1' }];
  expect(() => format(a)).toThrow('Этого типа не существует: 1');
});
