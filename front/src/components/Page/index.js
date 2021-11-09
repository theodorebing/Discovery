import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import AppHeader from '../../containers/AppHeader';
import Menu from '../Menu';

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
  isLogged: PropTypes.bool,
};

Page.defaultProps = {
  isLogged: false,
};

export default Page;
