import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import Root from './Root';

render(
  <Root history={browserHistory} />,
  document.getElementById('root')
);