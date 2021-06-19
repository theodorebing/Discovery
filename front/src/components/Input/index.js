import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  onChange, value, name, className, label, autocomplete, type,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value);
  };
  const inputId = `input-${name}`;
  let typeValue = name;
  console.log('type', type);
  console.log('name', name);
  console.log('typeValue', typeValue);
  if (type === 'search') {
    typeValue = type;
  }

  return (
    <label htmlFor={`${name}-input`} className={`${className} form-label`}>
      {label}
      <input
        id={inputId}
        type={typeValue}
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
