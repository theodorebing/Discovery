import { combineReducers } from 'redux';
import auth from './auth';
import link from './link';

export default combineReducers({
  auth,
  link,
});
