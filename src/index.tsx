import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/app';

import { PLUGIN, BROWSER } from '@constants';
import withSocketIO from './hoc/withSocketIO';

const Browser = withSocketIO(BROWSER, PLUGIN);

const { PREVIEW_ENV } = process.env;

ReactDOM.render(
  PREVIEW_ENV === 'browser' ? (
    <Browser>
      <App />
    </Browser>
  ) : (
    <App />
  ),
  document.getElementById('app')
);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
