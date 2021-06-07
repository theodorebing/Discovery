import React from 'react';
import Page from 'src/components/Page';
import { Redirect, useHistory } from 'react-router-dom';
import Logout from '../../containers/Logout';
import LinkForm from '../../containers/LinkForm';
import './styles.scss';

const CategoryPage = ({ category }) => {
  console.log('category', category);
  const history = useHistory();

  // const redirect = () => {
  //     return <Redirect to="/error" />;
  // };
  // setTimeout(
  //   if (!category) {
  //   redirect(), 2000,
  //   }
  // );
  return (
    <Page>
      <div className="category-page">
        <LinkForm />
        {category && (
          <h2 className="category-page__name">{category.name}</h2>
        )}
        <Logout />
      </div>
    </Page>
  );
};

export default CategoryPage;
