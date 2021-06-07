/* eslint-disable import/prefer-default-export */

export const findCategoryByName = (categories, name) => (
  categories.find((category) => category.name === name)
);
