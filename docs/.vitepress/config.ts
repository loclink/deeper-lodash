import { defineConfig } from 'vitepress';
import apidocConfig from '../apidocConfig.json';

export default defineConfig({
  description: ',',
  themeConfig: {
    sidebar: {
      '/dist/': apidocConfig
    },
    
  }
});
