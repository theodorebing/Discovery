import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const CategoriesList = ({ categories, className }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`categories-list categories-list--fade ${className}`}>
      <div className="categories-list__container">
        {categories.length && categories.map((category) => (
          <NavLink to={`category/${category.id}`} key={category.id} className="categories-list__name">{category.name}</NavLink>
        ))}
        {!loading && !categories.length && (
        <>
          <p className="categories-list__name categories-list__name--no-category">no category yet<br />create one first</p>
        </>
        )}
      </div>
    </div>
  );
};
export default CategoriesList;
