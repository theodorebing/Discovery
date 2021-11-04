import React from 'react';

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

export default Button;
