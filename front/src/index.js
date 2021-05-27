// == Import : npm
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  Provider,
} from 'react-redux';

// == Import : local
import store from 'src/store';
// Components
import App from './containers/App';

// == Render
const rootReactElement = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
const target = document.getElementById('root');
render(rootReactElement, target);
