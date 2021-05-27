import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const AppHeader = () => (
  <header className="header">
    <Link to="/">
      <h1 className="header-title">the link</h1>
    </Link>
  </header>
);

export default AppHeader;
