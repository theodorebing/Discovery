import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  onChange, value, name, className, label, autocomplete,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value);
  };
  const inputId = `input-${name}`;
  return (
    <label htmlFor={`${name}-input`} className={`${className} form-label`}>
      {label}
      <input
        id={inputId}
        type={name}
        value={value}
        name={name}
        className={`${className} form-input`}
        placeholder={name}
        onChange={handleChange}
        autoFocus
        autoComplete={autocomplete}
      />
    </label>
  );
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autocomplete: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  className: '',
  autocomplete: '',
};

export default Input;
