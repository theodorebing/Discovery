import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Button = ({
  classname, onClick, text, type,
}) => {
  if (type !== 'submit') {
    type = 'button';
  }
  return (
    <>
      <button type={type} className={`button ${classname}`} onClick={onClick}>{text}</button>
    </>
  );
};

Button.propTypes = {
  classname: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  classname: '',
  text: '',
  type: '',
};

export default Button;
