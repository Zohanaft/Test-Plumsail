import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@layouts/App';
import { BrowserRouter } from 'react-router-dom';
// глобальные стили (не должны переводиться в ts style modules)
import './assets/scss/main.scss';
import './assets/scss/styles.scss';

// Че-то надо с этим делать - не нравится мне исходный вес бандла
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/js/waves.js';

const mountTo = document.querySelector('#root');
mountTo.className = 'main';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  mountTo,
);
