import React from 'react';
import Page from 'src/components/Page';
import Logout from '../../containers/Logout';
import LinkForm from '../../containers/LinkForm';

import './styles.scss';

const Categories = ({ category }) => {
  console.log('category', category);

  return (
    <Page>
      <div className="category-page">
        <LinkForm />
        <h2 className="category-page__name">Category name</h2>
        <Logout />
      </div>
    </Page>
  );
};

export default Categories;
