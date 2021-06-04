import {
  GET_CATEGORIES,
  setCategories,
} from 'src/actions/categories';
import axios from 'src/api';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      axios.get('categories')
        .then((result) => {
          console.log('result', result);
          if (result && result.data) {
            store.dispatch(setCategories(result.data));
          }
        })
        .catch((error) => {
          (console.log('error', error));
          store.dispatch(setCategories([]));
        });
      return next(action);
    default:
      return next(action);
  }
};
