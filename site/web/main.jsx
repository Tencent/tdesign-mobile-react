import React from 'react';
import ReactDOM from 'react-dom';

import { registerLocaleChange } from 'tdesign-site-components';
import 'tdesign-site-components/lib/styles/prism-theme-dark.less';
import 'tdesign-site-components/lib/styles/prism-theme.less';
import 'tdesign-site-components/lib/styles/style.css';

import 'tdesign-icons-view';
import 'tdesign-theme-generator';

import App from './App';
import '../style/web/index.less';

registerLocaleChange();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
);
