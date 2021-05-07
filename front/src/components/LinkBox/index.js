// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import

import './styles.scss';

// == Composant
const LinkBox = ({ link }) => (
  <div className="linkBox-mainDiv">
    <a href={link.url} className="linkBox">
      <img src={link.image} alt="link" />
      <div className="linkBox-text">
        <div className="linkBox-description">Description : {link.description}</div>
        <div className="linkBox-title">Title : {link.title}</div>
        <div className="linkBox-url dont-break-out">url : {link.url}</div>
      </div>
    </a>
  </div>
);

LinkBox.propTypes = {
  link: PropTypes.object,
};

LinkBox.defaultProps = {
  link: {},
};

// == Export
export default LinkBox;
