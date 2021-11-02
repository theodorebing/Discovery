import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Content = ({ title, text }) => (
  <section className="content">
    <h1 className="content-title">{title}</h1>
    <p className="content-text">{text}</p>
  </section>
);

Content.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Content;
