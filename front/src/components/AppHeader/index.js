import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const AppHeader = ({ isLogged }) => (
  <header className={classNames('header', { 'header--index': !isLogged })}>
    <h1 className="header-title">
      <Link to="/">
        the link
      </Link>
    </h1>
  </header>
);

AppHeader.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default AppHeader;
