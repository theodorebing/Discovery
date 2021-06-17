import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import AppHeader from 'src/containers/AppHeader';

const Page = ({ children }) => (
  <main className="page">
    <AppHeader />
    <div className="page-content">
      {children}
    </div>
  </main>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
