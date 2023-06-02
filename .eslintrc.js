module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended', // 启用ESLint内置的推荐规则
    'plugin:prettier/recommended' // 启用eslint-plugin-prettier插件中的recommended规则
  ],
  // 全局变量。详见https://zh-hans.eslint.org/docs/latest/use/configure/language-options#-6
  globals: {
    // $: 'readonly'
  },
  // 自定义规则，详见：https://zh-hans.eslint.org/docs/latest/use/configure/rules
  rules: {
    'vue/name-property-casing': ['error', 'PascalCase'],
    'no-spaced-func': 'error',
    'no-const-assign': 'error',
    'no-alert': 'off',
    'no-useless-escape': 'off',
    'no-control-regex': 'off',
    'space-before-function-paren': ['off', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
