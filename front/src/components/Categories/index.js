import React, { useEffect } from 'react';
import Page from 'src/components/Page';
import './styles.scss';
import Logout from '../../containers/Logout';
import LinkForm from '../../containers/LinkForm';
import CategoriesList from '../CategoriesList';
// import axios from '../../api';

const Categories = ({ getCategories, categories }) => {
  // const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Page>
      <div className="categories">
        <LinkForm />
        <CategoriesList categories={categories} />
        <Logout />
      </div>
    </Page>
  );
};
export default Categories;
