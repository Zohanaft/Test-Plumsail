import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { App } from '@layouts/App';

import './assets/scss/main.scss';
import './assets/scss/styles.scss';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/js/waves.js';

const mountTo = document.querySelector('#root');
mountTo.className = 'main';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  mountTo,
);
