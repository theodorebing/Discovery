import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  onChange, value, name, className, label,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value);
  };
  const inputId = `input-${name}`;
  return (
    <label htmlFor={`${name}-input`} className="form-label">
      {label}
      <input
        id={inputId}
        type={name}
        value={value}
        name={name}
        className={`${className} form-input`}
        placeholder={name}
        onChange={handleChange}
      />
    </label>
  );
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Input.defaultProps = {
  className: '',
};

export default Input;
