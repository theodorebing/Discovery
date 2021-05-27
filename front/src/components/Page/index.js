import React from 'react';
import PropTypes from 'prop-types';

import AppHeader from 'src/components/AppHeader';

const Page = ({ children }) => (
  <main className="page">
    <AppHeader />
    {children}
  </main>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
