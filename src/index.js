import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <CookiesProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </CookiesProvider>,
  document.getElementById('root'),
);

registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
