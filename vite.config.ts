import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'DeeperLodash',
      fileName: (format) => `index.${format === 'umd' ? 'min.js' : 'js'}`
    },
    rollupOptions: {
      // 排除 lodash
      external: ['lodash']
    }
  },
  plugins: [dts()]
});
