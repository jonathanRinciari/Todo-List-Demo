import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/app';

import './stylesheets/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('main'));
});
