import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import AppHeader from 'src/containers/AppHeader';
import Menu from 'src/components/Menu';

const Page = ({ children, isLogged }) => (
  <main className="page">
    {isLogged && <Menu />}
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
