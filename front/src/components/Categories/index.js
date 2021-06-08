import React from 'react';
import Page from '../Page';
import './styles.scss';
import Logout from '../../containers/Logout';
import LinkForm from '../../containers/LinkForm';
import CategoriesList from '../CategoriesList';

// import axios from '../../api';

const Categories = ({ categories }) =>
// const [categories, setCategories] = useState([]);

  (
    <Page>
      <div className="categories">
        <LinkForm />
        <CategoriesList categories={categories} />
        <p className="categories__create">create a new category +</p>
        <Logout />
      </div>
    </Page>
  );

export default Categories;
