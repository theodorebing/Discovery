import {
  SET_CATEGORIES,
} from 'src/actions/categories';

import {
  LOGOUT,
} from 'src/actions/auth';

const initialState = {
  categories: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        categories: action.categories,
      };
    case LOGOUT:
      return {
        categories: [],
      };
    default:
      return state;
  }
};
