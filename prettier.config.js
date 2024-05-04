/* eslint-disable*/
module.exports = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  // react, npm-modules, utils, hooks, features, model, redux, other "global" imports, relative imports, styles
  importOrder: [
    '^react',
    '^\\w',
    '^@/types',
    '^@/utils/',
    '^@/hooks/',
    '^@/features/',
    '^@/model/',
    '^@/redux/',
    '^@/(.*)$',
    '^[./].*(?<!\\.(c|sc)ss)$',
    '\\.(c|sc)ss$',
  ],
  importOrderSortSpecifiers: true,
};
