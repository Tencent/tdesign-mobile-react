import { defineConfig } from 'cypress';
import vitestConfig from './vitest.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: vitestConfig,
    },
  },
});
