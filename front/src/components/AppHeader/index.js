import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import classNames from 'classnames';

const AppHeader = ({ isLogged }) => (
  <header className={classNames('header', { 'header--index': !isLogged })}>
    <h1 className="header-title">
      <Link to="/">
        the link
      </Link>
    </h1>
  </header>
);

export default AppHeader;
