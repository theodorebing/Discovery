/* eslint-disable import/prefer-default-export */

export const findCategoryById = (categories, id) => (
  categories.find((category) => category.id.toString() === id)
);
