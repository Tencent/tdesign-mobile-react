import path from 'path';

import { defineConfig } from 'vite';
import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tdocPlugin from './plugin-tdoc';
import pwaConfig from './pwaConfig';

const publicPathMap = {
  preview: '/',
  intranet: '/mobile-react/',
  production: 'https://static.tdesign.tencent.com/mobile-react/',
};

export default ({ mode }) =>
  defineConfig({
    base: publicPathMap[mode],
    define: {
      __VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../'),
        '@doc': path.resolve(__dirname, './doc'),
        '@components': path.resolve(__dirname, './src/components'),
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
  });
