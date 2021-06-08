export const GET_CATEGORIES = 'GET_CATEGORIES';

export const getCategories = () => ({
  type: GET_CATEGORIES,
});

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  categories,
});
