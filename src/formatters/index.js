import stylish from './stylish.js';

export default (innerTree, format = stylish) => {
  switch (format) {
    case 'stylish':
      return stylish(innerTree);
    case 'json':
      return JSON.stringify(innerTree);
    default:
      throw new Error(`Формат не поддерживается: ${format}`);
  }
};
