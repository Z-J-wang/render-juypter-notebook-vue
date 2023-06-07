module.exports = {
  printWidth: 120, // 一行的字符数，如果超过会进行换行，默认为80。注意，该值必须设置为120，否则与eslint规则冲突
  tabWidth: 2, // 一个tab代表几个空格数，默认为2
  useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
  semi: true, // 行尾是否使用分号，默认为true
  arrowParens: 'avoid', // 箭头函数只有一个参数时，是否忽略括号，默认为'always'
  trailingComma: 'none', // 在对象和数组字面量中使用一致的拖尾逗号,默认'es5'
  endOfLine: 'lf' // default: auto
};
