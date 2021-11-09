/* eslint-disable no-underscore-dangle */
import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from '../reducers';

import categoriesMiddleware from '../middlewares/categories';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    categoriesMiddleware,
  ),
);

const store = createStore(rootReducer, enhancers);

export default store;
