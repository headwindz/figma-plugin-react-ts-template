import React from 'react';
import ReactDOM from 'react-dom';
import { PLUGIN, BROWSER } from '@constants';
import withSocketIO from './hoc/withSocketIO';

const Plugin = withSocketIO(PLUGIN, BROWSER);

ReactDOM.render(
  <Plugin>
    {connected => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        Connect status:
        <span
          style={{
            marginLeft: 8,
            width: 16,
            height: 16,
            background: connected ? 'green' : 'red',
          }}
        ></span>
      </div>
    )}
  </Plugin>,
  document.getElementById('app')
);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
