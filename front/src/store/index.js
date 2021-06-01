/* eslint-disable no-underscore-dangle */
import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from 'src/reducers';

import linkMiddleware from 'src/middlewares/link';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(

  ),
);

const store = createStore(rootReducer, enhancers);

export default store;
