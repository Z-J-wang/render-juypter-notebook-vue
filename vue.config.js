const { defineConfig } = require('@vue/cli-service');
const TerserPlugin = require('terser-webpack-plugin'); // js压缩插件

module.exports = defineConfig({
  publicPath: '/render-juypter-notebook-vue/',
  productionSourceMap: false,
  transpileDependencies: true,

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';
      // 将每个依赖包打包成单独的js文件
      const optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all', // 选择哪些 chunk 进行优化, 有效值 all，async 和 initial
          maxAsyncRequests: 30, // 按需加载时的最大并行请求数
          maxInitialRequests: 30, // 入口点的最大并行请求数
          minSize: 300000, // 生成 chunk 的最小体积（以 bytes 为单位）
          maxSize: 1024000, // 生成 chunk 的最大体积（以 bytes 为单位），对大于该值的js尝试做拆分
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'all',
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `npm.${packageName.replace('@', '')}`;
              }
            }
          }
        },
        // 插件优化
        minimize: true,
        minimizer: [
          // js压缩插件
          new TerserPlugin({
            parallel: true,
            extractComments: false, // 注释剥离功能
            terserOptions: {
              format: {
                comments: false // 删除所有注释
              },
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'] // 移除console
              }
            }
          })
        ]
      };
      Object.assign(config, {
        optimization
      });
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';
    }
  },
  css: {
    extract: false // 强制css内联，以便于引入lib组件时不需要再引入对应的css
  }
});
