import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const CategoriesList = ({ categories }) => {
  console.log('categories', categories);
  return (
    <div className="categories-list categories-list--fade">
      <div className="categories-list__container">
        {categories.map((category) => (
          <NavLink to="/" key={category.id} className="categories-list__name">{category.name}</NavLink>
        ))}
      </div>

    </div>
  );
};
export default CategoriesList;
