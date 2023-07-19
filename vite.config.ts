import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: '_DL',
      fileName: (format) => `index.${format === 'umd' ? 'min.js' : 'js'}`
    },
    rollupOptions: {
      // 排除 lodash
      external: ['lodash'],
      // 导出时声明全局命名空间
      output: {
        globals: {
          lodash: '_'
        }
      }
    }
  },
  plugins: [dts()]
});
