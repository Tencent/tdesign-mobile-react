import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '../style/mobile/index.less'

import '../../src/_common/style/mobile/_reset.less';
import '../../src/_common/style/mobile/index.less';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app'),
);
