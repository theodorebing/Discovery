/* eslint-disable no-empty */

import {
// OPEN_LINK_FORM,
// openLinkForm,
} from 'src/actions/link';

export default (store) => (next) => (action) => {
  switch (action.type) {
    // case OPEN_LINK_FORM:
    //   store.dispatch(openLinkForm());
    //   return next(action);
    default:
      return next(action);
  }
};
