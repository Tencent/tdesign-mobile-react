import path from 'path';

import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tdocPlugin from './plugin-tdoc';
import pwaConfig from './pwaConfig';

export default {
  base: process.env.NODE_ENV === 'production' ? '/react-mobile/' : './',
  define: {
    __VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../'),
      '@doc': path.resolve(__dirname, './doc'),
      '@components': path.resolve(__dirname, './src/components'),
      '@examples': path.resolve(__dirname, '../examples'),
      '@common': path.resolve(__dirname, '../src/_common'),
      'tdesign-mobile-react': path.resolve(__dirname, '../src'),
    },
  },
  build: {
    outDir: '../_site',
    rollupOptions: {
      input: {
        site: 'index.html',
        mobile: 'mobile.html',
      },
    },
  },
  jsx: 'react',
  server: {
    host: '0.0.0.0',
    port: 19000,
    open: '/',
    https: false,
    fs: { strict: false },
  },
  plugins: [react(), tdocPlugin(), VitePWA(pwaConfig), replace({ __DATE__: new Date().toISOString() })],
};
