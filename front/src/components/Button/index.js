import React from 'react';

import './styles.scss';

const Button = ({ classname, onClick, text }) => (
  <>
    <button type="button" className={`button ${classname}`} onClick={onClick}>{text}</button>
  </>
);

export default Button;
