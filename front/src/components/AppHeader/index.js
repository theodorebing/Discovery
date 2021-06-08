import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const AppHeader = () => (
  <header className="header">
    <h1 className="header-title">
      <Link to="/">
        the link
      </Link>
    </h1>
  </header>
);

export default AppHeader;
