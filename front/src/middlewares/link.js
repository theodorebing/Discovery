/* eslint-disable no-empty */

import {

} from 'src/actions/link';

export default (store) => (next) => (action) => {
  switch (action.type) {
    // case SET_ISLOGGED:
    //   store.dispatch(setIsLogged());
    //   return next(action);
    default:
      return next(action);
  }
};
