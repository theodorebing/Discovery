import {
  SET_CATEGORIES,
} from 'src/actions/categories';

const initialState = {
  categories: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        categories: action.categories,
      };
    default:
      return state;
  }
};
