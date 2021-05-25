/* eslint-disable jsx-a11y/label-has-associated-control */
// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  NavLink,
  Link,
} from 'react-router-dom';

// == Import
import './styles.scss';

// == Composant
const Categories = ({ categories, categorySelected }) => (
  // <div className="categories">
  //   <div>
  //     <div className="categories-menu">
  //       {categories.map((category) => (
  //         <NavLink
  //           key={category.id}
  //           className="categories-link"
  //           to={`/category/${category.id}`}
  //           onClick={categorySelected}
  //         >
  //           {category.name}
  //         </NavLink>
  //       ))}
  //     </div>
  //   </div>
  //   <div className="categories-createLink">
  //     <NavLink to="/createCategory">Create a new category</NavLink>
  //   </div>
  </div>
);

// == Export
export default Categories;
