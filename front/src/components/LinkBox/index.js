// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import

import './styles.scss';

// == Composant
const LinkBox = ({ link }) => (
  <div className="linkBox-mainDiv">
    <a href={link.url} className="linkBox">
      <img src={link.image} alt="link" className="linkBox-image" />
      <div className="linkBox-texts">
        <div className="linkBox-description linkBox-text">Description : {link.description}</div>
        <div className="linkBox-title linkBox-text">Title : {link.title}</div>
        <div className="linkBox-url linkBox-text dont-break-out">url : {link.url}</div>
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
