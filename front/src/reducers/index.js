import { combineReducers } from 'redux';
import auth from './auth';
import link from './link';
import categories from './categories';

export default combineReducers({
  auth,
  link,
  categories,
});
