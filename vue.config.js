const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  css: {
    extract: false, // 强制css内联，以便于引入lib组件时不需要再引入对应的css
  },
});
