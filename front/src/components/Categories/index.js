import React from 'react';
import Page from 'src/components/Page';
import './styles.scss';
import Logout from '../../containers/Logout';
import LinkForm from '../../containers/LinkForm';

const Categories = () => (
  <Page>
    <div className="categories">
      <LinkForm />
      <Logout />
    </div>
  </Page>
);

export default Categories;
