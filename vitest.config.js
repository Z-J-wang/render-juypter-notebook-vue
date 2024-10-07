import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue() /* 引入vue扩展，用于识别vue文件 */],
  test: {
    reporters: ['verbose'],
    environment: 'jsdom' // 全局引入DOM环境
  }
});
