/**
 * stylelint 依赖如下：
 * "stylelint": "^13.3.3"
 * "stylelint-config-standard": "^20.0.0"
 * "stylelint-order": "^6.0.3"
 *
 * vue2 中 stylelint 需要v13及以下版本
 * stylelint-config-standard v20.0.0为stylelint v13.3.3 配套版本
 * stylelint-order 用于样式属性排序
 */

module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'color-hex-case': 'lower', // 颜色指定小写
    'block-no-empty': true, // 禁止空块
    'color-hex-length': 'long', // 颜色6位长度
    'declaration-block-trailing-semicolon': ['always', { ignore: ['single-declaration'] }], // 在声明块中使用尾随分号
    // 兼容自定义标签名
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: []
      }
    ],
    // 忽略伪类选择器 ::v-deep
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'no-descending-specificity': null, // 禁止低优先级的选择器出现在高优先级的选择器之后。
    'at-rule-no-unknown': null, // 不验证@未知的名字，为了兼容scss的函数
    'comment-no-empty': true, // 禁止空注释
    'shorthand-property-no-redundant-values': true, // 禁止简写属性的冗余值
    'value-no-vendor-prefix': true, // 禁止值的浏览器引擎前缀
    'property-no-vendor-prefix': true, // property-no-vendor-prefix
    'number-leading-zero': 'always', // 禁止小于 1 的小数有一个前导零
    'no-empty-first-line': true, // 禁止空第一行
    // 属性的排序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-weight',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ]
  }
};
