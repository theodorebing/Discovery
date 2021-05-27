/* eslint-disable no-empty */

import {
  SET_ISLOGGED,
  setIsLogged,
} from 'src/actions/auth';

export default (store) => (next) => (action) => {
  switch (action.type) {
    // case SET_ISLOGGED:
    //   store.dispatch(setIsLogged());
    //   return next(action);
    default:
      return next(action);
  }
};
