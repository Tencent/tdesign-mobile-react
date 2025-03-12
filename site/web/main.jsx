import React from 'react';
import ReactDOM from 'react-dom';
import { registerLocaleChange } from 'tdesign-site-components';
import App from './App';

import '../style/web/index.less';

import 'tdesign-site-components/lib/styles/style.css';
import 'tdesign-site-components/lib/styles/prism-theme.less';
import 'tdesign-site-components/lib/styles/prism-theme-dark.less';

// import icons webcomponents
import 'tdesign-icons-view';

registerLocaleChange();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
);
